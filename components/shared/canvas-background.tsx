"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

// Simple seeded PRNG (Mulberry32)
function seededRandom(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Particle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  orbitRadius: number;
  centerIndex: number;
  color: string;
  lineColor: string;
  radius: number;
}

// Smooth spotlight position using lerp
const spotlight = { x: -1000, y: -1000, tx: -1000, ty: -1000 };

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const SEED = 8506;
    const random = seededRandom(SEED);

    // Dynamic particle count based on screen width
    const getParticleCount = (w: number) => {
      if (w < 768) return 55;
      if (w < 1024) return 90;
      return 140;
    };

    // Constellation link distance threshold
    const LINK_DISTANCE = 130;

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const newParticles: Particle[] = [];

      // 3 gravity centers
      const centersCount = 3;

      // Theme-matched colors: Cyber-Emerald, Orchid Purple, Electric Cyan, Soft White
      const colors = [
        { fill: "rgba(0, 245, 160, 0.55)",  line: "rgba(0, 245, 160, 0.18)" },  // Cyber-Emerald
        { fill: "rgba(176, 38, 255, 0.50)",  line: "rgba(176, 38, 255, 0.15)" }, // Orchid Purple
        { fill: "rgba(0, 210, 255, 0.50)",   line: "rgba(0, 210, 255, 0.15)" },  // Electric Cyan
        { fill: "rgba(249, 250, 252, 0.35)", line: "rgba(249, 250, 252, 0.10)" } // Soft White
      ];

      for (let i = 0; i < count; i++) {
        const centerIndex = Math.floor(random() * centersCount);
        const maxRadius = Math.min(w, h) * 0.45;
        const orbitRadius = 40 + random() * (maxRadius - 40);
        const speed = (0.0006 + random() * 0.001) * (random() > 0.5 ? 1 : -1);
        const angle = random() * Math.PI * 2;
        const colorEntry = colors[Math.floor(random() * colors.length)];

        newParticles.push({
          x: w * 0.5,
          y: h * 0.5,
          angle,
          speed,
          orbitRadius,
          centerIndex,
          color: colorEntry.fill,
          lineColor: colorEntry.line,
          radius: 1.4 + random() * 1.8, // 1.4px to 3.2px
        });
      }

      particles = newParticles;
    };

    const handleResize = () => {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      width = w;
      height = h;
      initParticles(w, h);
      if (isReducedMotion) draw();
    };

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const centers = [
        { x: width * 0.5,  y: height * 0.5 },
        { x: width * 0.22, y: height * 0.4 },
        { x: width * 0.78, y: height * 0.6 },
      ];

      // 1. Cursor spotlight — large soft radial glow that follows the mouse
      if (spotlight.x > -500) {
        const grad = ctx.createRadialGradient(
          spotlight.x, spotlight.y, 0,
          spotlight.x, spotlight.y, 380
        );
        grad.addColorStop(0,   "rgba(0, 245, 160, 0.07)");
        grad.addColorStop(0.4, "rgba(176, 38, 255, 0.04)");
        grad.addColorStop(1,   "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Faint concentric orbit paths
      ctx.lineWidth = 0.5;
      centers.forEach((center, idx) => {
        const rings = idx === 0 ? [100, 220, 360, 500] : [120, 240];
        rings.forEach((r) => {
          ctx.strokeStyle = "rgba(0, 245, 160, 0.04)";
          ctx.beginPath();
          ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
          ctx.stroke();
        });
      });

      // 3. Constellation mesh — draw glowing lines between close particles
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            // Line fades out the farther apart the particles are
            const alpha = (1 - dist / LINK_DISTANCE);
            // Use the lighter of the two particles' line colors, blended by distance
            ctx.strokeStyle = a.lineColor.replace(
              /[\d.]+\)$/,
              `${(alpha * 0.4).toFixed(3)})`
            );
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw particles with subtle glow
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft glow shadow behind each dot
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset shadow so it doesn't bleed into other draws
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    };

    const update = () => {
      const mouse = mouseRef.current;

      // Smoothly lerp spotlight toward actual mouse position
      spotlight.x += (spotlight.tx - spotlight.x) * 0.07;
      spotlight.y += (spotlight.ty - spotlight.y) * 0.07;

      const centers = [
        { x: width * 0.5,  y: height * 0.5 },
        { x: width * 0.22, y: height * 0.4 },
        { x: width * 0.78, y: height * 0.6 },
      ];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const center = centers[p.centerIndex] || centers[0];

        p.angle += p.speed;

        let targetX = center.x + Math.cos(p.angle) * p.orbitRadius;
        let targetY = center.y + Math.sin(p.angle) * p.orbitRadius;

        // Mouse repulsion
        if (mouse.active) {
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const force = (1 - dist / 160) * 40;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force;
          }
        }

        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;
      }
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      spotlight.tx = e.clientX;
      spotlight.ty = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    handleResize();

    if (!isReducedMotion) {
      loop();
    } else {
      draw();
    }

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-70 transition-opacity duration-1000"
      style={{ zIndex: 1 }}
    />
  );
}
