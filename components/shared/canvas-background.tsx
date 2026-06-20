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
  radius: number;
}

// Module-level spotlight — lerped smoothly toward cursor each frame
const spotlight = { x: -2000, y: -2000, tx: -2000, ty: -2000 };

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
    const LINK_DISTANCE = 110;

    const getParticleCount = (w: number) => {
      if (w < 768) return 50;
      if (w < 1024) return 80;
      return 120;
    };

    // Theme colors: Cyber-Emerald, Orchid Purple, Electric Cyan, Soft White
    const COLORS = [
      "rgba(0, 245, 160, 0.6)",
      "rgba(176, 38, 255, 0.55)",
      "rgba(0, 210, 255, 0.55)",
      "rgba(249, 250, 252, 0.35)",
    ];

    const getCenters = (w: number, h: number) => [
      { x: w * 0.5,  y: h * 0.5 },
      { x: w * 0.22, y: h * 0.4 },
      { x: w * 0.78, y: h * 0.6 },
    ];

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const centers = getCenters(w, h);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const centerIndex = Math.floor(random() * centers.length);
        const center = centers[centerIndex];
        const maxRadius = Math.min(w, h) * 0.45;
        const orbitRadius = 40 + random() * (maxRadius - 40);
        const speed = (0.0006 + random() * 0.001) * (random() > 0.5 ? 1 : -1);
        const angle = random() * Math.PI * 2;

        // ✅ Initialize directly at orbit position — no center clustering crash
        newParticles.push({
          x: center.x + Math.cos(angle) * orbitRadius,
          y: center.y + Math.sin(angle) * orbitRadius,
          angle,
          speed,
          orbitRadius,
          centerIndex,
          color: COLORS[Math.floor(random() * COLORS.length)],
          radius: 1.4 + random() * 1.8,
        });
      }

      particles = newParticles;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Cursor spotlight — smooth radial glow that follows the mouse
      if (spotlight.x > -1500) {
        const grad = ctx.createRadialGradient(
          spotlight.x, spotlight.y, 0,
          spotlight.x, spotlight.y, 400
        );
        grad.addColorStop(0,    "rgba(0, 245, 160, 0.07)");
        grad.addColorStop(0.45, "rgba(176, 38, 255, 0.04)");
        grad.addColorStop(1,    "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(spotlight.x, spotlight.y, 400, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Faint concentric orbit rings
      const centers = getCenters(width, height);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(0, 245, 160, 0.05)";
      centers.forEach((center, idx) => {
        const rings = idx === 0 ? [110, 230, 370, 510] : [130, 250];
        rings.forEach((r) => {
          ctx.beginPath();
          ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
          ctx.stroke();
        });
      });

      // 3. Constellation mesh — batch ALL lines into ONE path for performance
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      // Single stroke call for all lines — massive perf win
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(0, 245, 160, 0.12)";
      ctx.stroke();

      // 4. Draw particles — glow effect via shadow
      ctx.shadowBlur = 8;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
    };

    const update = () => {
      const mouse = mouseRef.current;

      // Lerp spotlight toward cursor
      spotlight.x += (spotlight.tx - spotlight.x) * 0.08;
      spotlight.y += (spotlight.ty - spotlight.y) * 0.08;

      const centers = getCenters(width, height);

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
            const a = Math.atan2(dy, dx);
            targetX += Math.cos(a) * force;
            targetY += Math.sin(a) * force;
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
      className="fixed inset-0 pointer-events-none opacity-75 transition-opacity duration-1000"
      style={{ zIndex: 1 }}
    />
  );
}
