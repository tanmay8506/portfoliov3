"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ribbon {
  color: string;
  glowColor: string;
  alpha: number;
  width: number;
  yOffset: number;
  speed: number;
  phase: number;
  freq1: number;
  freq2: number;
  amp1: number;
  amp2: number;
}

const RIBBONS: Ribbon[] = [
  {
    color: "#dc2626",
    glowColor: "#dc2626",
    alpha: 0.9,
    width: 2.5,
    yOffset: 0,
    speed: 0.6,
    phase: 0,
    freq1: 1.8,
    freq2: 0.9,
    amp1: 0.28,
    amp2: 0.09,
  },
  {
    color: "#ef4444",
    glowColor: "#ef4444",
    alpha: 0.6,
    width: 1.8,
    yOffset: 0.08,
    speed: 0.45,
    phase: Math.PI * 0.4,
    freq1: 1.4,
    freq2: 1.1,
    amp1: 0.22,
    amp2: 0.12,
  },
  {
    color: "#f87171",
    glowColor: "#f87171",
    alpha: 0.4,
    width: 1.2,
    yOffset: -0.1,
    speed: 0.75,
    phase: Math.PI * 0.8,
    freq1: 2.2,
    freq2: 0.7,
    amp1: 0.18,
    amp2: 0.07,
  },
  {
    color: "#b91c1c",
    glowColor: "#b91c1c",
    alpha: 0.55,
    width: 2.0,
    yOffset: -0.06,
    speed: 0.52,
    phase: Math.PI * 1.2,
    freq1: 1.6,
    freq2: 1.3,
    amp1: 0.25,
    amp2: 0.1,
  },
];

const NAME = "TANMAY";
const TOTAL_DURATION = 2800; // ms before auto-dismiss
const EXIT_DURATION = 900;   // ms for fade-out

export function IntroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem("intro-seen", "1");
    setTimeout(() => setVisible(false), EXIT_DURATION);
  }, [exiting]);

  // Mount check + sessionStorage gate
  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("intro-seen")) {
      setVisible(false);
      return;
    }
    const skipTimer = setTimeout(() => setShowSkip(true), 600);
    const autoTimer = setTimeout(dismiss, TOTAL_DURATION);
    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Canvas ribbon animation
  useEffect(() => {
    if (!visible || !mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawRibbon = (
      ribbon: Ribbon,
      t: number,
      progress: number,
      exitFade: number
    ) => {
      const w = canvas.width;
      const h = canvas.height;
      const pts = 80;

      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const pct = i / pts;
        const x = pct * w;
        const wave1 =
          Math.sin(pct * Math.PI * ribbon.freq1 + t * ribbon.speed + ribbon.phase) *
          h * ribbon.amp1;
        const wave2 =
          Math.sin(pct * Math.PI * ribbon.freq2 + t * ribbon.speed * 0.6 + ribbon.phase + 1.5) *
          h * ribbon.amp2;
        const y = h * (0.5 + ribbon.yOffset) + wave1 + wave2;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      const alpha = ribbon.alpha * progress * (1 - exitFade);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = ribbon.color;
      ctx.lineWidth = ribbon.width * (window.devicePixelRatio || 1);
      ctx.shadowColor = ribbon.glowColor;
      ctx.shadowBlur = 28;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Second glow pass (wider, softer)
      ctx.globalAlpha = alpha * 0.3;
      ctx.lineWidth = ribbon.width * 4;
      ctx.shadowBlur = 60;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = elapsed / 1000;

      // Sweep-in progress (0→1 over first 700ms)
      const progress = Math.min(elapsed / 700, 1);

      // Exit fade (0→1 during exit phase)
      const exitFade = exiting ? Math.min((elapsed - (TOTAL_DURATION - EXIT_DURATION)) / EXIT_DURATION, 1) : 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      RIBBONS.forEach((r) => drawRibbon(r, t, progress, Math.max(0, exitFade)));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible, mounted, exiting]);

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#08090c" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: EXIT_DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Ribbon canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Central content */}
        <div className="relative z-10 flex flex-col items-center gap-5 select-none">
          {/* Name — staggered letter reveal */}
          <div
            className="flex items-center"
            style={{ letterSpacing: "0.45em" }}
          >
            {NAME.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-white"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Cormorant', serif",
                  fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  textShadow:
                    "0 0 60px rgba(220,38,38,0.45), 0 0 20px rgba(220,38,38,0.2)",
                }}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.55 + i * 0.07,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-white/35 uppercase"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}
          >
            AI Engineer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; Creator
          </motion.p>

          {/* Bottom line progress bar */}
          <motion.div
            className="absolute -bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <div className="w-32 h-px bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-red-500/60 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay: 1.0,
                  duration: (TOTAL_DURATION - 1000) / 1000,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Skip button */}
        <AnimatePresence>
          {showSkip && !exiting && (
            <motion.button
              onClick={dismiss}
              className="absolute bottom-8 right-8 text-white/25 hover:text-white/60 transition-colors duration-300 cursor-pointer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              aria-label="Skip intro"
            >
              SKIP →
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
