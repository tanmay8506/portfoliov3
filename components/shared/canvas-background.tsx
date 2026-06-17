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
      let count = 120;
      if (w < 768) {
        count = 45;
      } else if (w < 1024) {
        count = 75;
      }
      return count;
    };

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const newParticles: Particle[] = [];
      
      // We define 3 gravity centers
      const centersCount = 3;

      const colors = [
        "rgba(66, 133, 244, 0.28)",  // Google Blue
        "rgba(219, 68, 85, 0.22)",   // Google Red
        "rgba(138, 143, 152, 0.25)", // Slate Gray
        "rgba(247, 248, 248, 0.25)"  // Ink White/Light
      ];

      for (let i = 0; i < count; i++) {
        const centerIndex = Math.floor(random() * centersCount);
        
        // Random orbit radius between 50px and 450px
        const maxRadius = Math.min(w, h) * 0.45;
        const orbitRadius = 40 + random() * (maxRadius - 40);
        
        // Angular velocity (orbit speed) - slow and fluid
        const speed = (0.0008 + random() * 0.0012) * (random() > 0.5 ? 1 : -1);
        const angle = random() * Math.PI * 2;

        newParticles.push({
          x: w * 0.5,
          y: h * 0.5,
          angle,
          speed,
          orbitRadius,
          centerIndex,
          color: colors[Math.floor(random() * colors.length)],
          radius: 1.2 + random() * 1.6, // 1.2px to 2.8px
        });
      }

      particles = newParticles;
    };

    const handleResize = () => {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update resolution
      canvas.width = w;
      canvas.height = h;
      width = w;
      height = h;

      initParticles(w, h);

      // If reduced motion, render one frame and stop
      if (isReducedMotion) {
        draw();
      }
    };

    // Debounced resize
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      const centers = [
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.22, y: height * 0.4 },
        { x: width * 0.78, y: height * 0.6 }
      ];

      // 1. Draw faint concentric orbit paths
      ctx.lineWidth = 1;
      centers.forEach((center, idx) => {
        // Different orbit rings depending on center index
        const rings = idx === 0 ? [100, 220, 360, 500] : [120, 240];
        
        rings.forEach((r) => {
          // Extremely subtle transparent hairline circles
          ctx.strokeStyle = "rgba(138, 143, 152, 0.05)";
          ctx.beginPath();
          ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
          ctx.stroke();
        });
      });

      // 2. Draw active particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      const mouse = mouseRef.current;
      const centers = [
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.22, y: height * 0.4 },
        { x: width * 0.78, y: height * 0.6 }
      ];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const center = centers[p.centerIndex] || centers[0];

        // Orbit around gravity center
        p.angle += p.speed;

        let targetX = center.x + Math.cos(p.angle) * p.orbitRadius;
        let targetY = center.y + Math.sin(p.angle) * p.orbitRadius;

        // Mouse repulsion force calculations
        if (mouse.active) {
          const dx = targetX - mouse.x;
          const dy = targetY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 140) {
            // Push outwards, stronger when closer
            const force = (1 - dist / 140) * 35;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force;
          }
        }

        // Spring acceleration towards target coordinates
        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;
      }
    };

    const loop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial setup
    handleResize();

    // Start loop if motion is NOT reduced
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
      className="fixed inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
      style={{ zIndex: 1 }}
    />
  );
}
