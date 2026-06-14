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
  vx: number;
  vy: number;
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

    // Determine particle count based on screen width & system hardware
    const getParticleCount = (w: number) => {
      let count = 80;
      if (w < 768) {
        count = 25;
      } else if (w < 1024) {
        count = 40;
      }

      // Check low-end devices
      if (
        typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency &&
        navigator.hardwareConcurrency < 4
      ) {
        count = Math.min(count, 20);
      }

      return count;
    };

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        // Generate reproducible positions and velocities
        newParticles.push({
          x: random() * w,
          y: random() * h,
          vx: (random() - 0.5) * 0.4,
          vy: (random() - 0.5) * 0.4,
          radius: 1.5 + random() * 1.5, // 1.5px to 3.0px
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

      // Clear with very faint transparency or complete clear
      ctx.clearRect(0, 0, width, height);

      // Draw lines first
      ctx.lineWidth = 1;
      const inkColor = "247, 248, 248"; // matches --color-ink rgb

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(${inkColor}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(${inkColor}, 0.2)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Keep inside boundaries after bounce
        if (p.x < 0) p.x = 0;
        if (p.x > width) p.x = width;
        if (p.y < 0) p.y = 0;
        if (p.y > height) p.y = height;

        // Mouse interaction: soft repel
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 150) {
            // Repel force: stronger when closer, max force 0.3
            const force = (1 - dist / 150) * 0.3;
            // Normalize direction vector
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2;
            p.y += Math.sin(angle) * force * 2;
          }
        }
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
      className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-1000"
      style={{ zIndex: 1 }}
    />
  );
}
