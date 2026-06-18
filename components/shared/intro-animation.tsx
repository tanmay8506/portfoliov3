"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ribbon {
  color: string;
  alpha: number;
  yOffset: number;
  speed: number;
  phase: number;
  freq1: number;
  freq2: number;
  amp1: number;
  amp2: number;
}

const RIBBONS: Ribbon[] = [
  { color: "#dc2626", alpha: 1.0,  yOffset:  0.00, speed: 0.55, phase: 0,              freq1: 1.8, freq2: 0.9, amp1: 0.28, amp2: 0.09 },
  { color: "#ef4444", alpha: 0.80, yOffset:  0.08, speed: 0.42, phase: Math.PI * 0.4,  freq1: 1.4, freq2: 1.1, amp1: 0.22, amp2: 0.12 },
  { color: "#f87171", alpha: 0.60, yOffset: -0.10, speed: 0.68, phase: Math.PI * 0.8,  freq1: 2.2, freq2: 0.7, amp1: 0.18, amp2: 0.07 },
  { color: "#b91c1c", alpha: 0.70, yOffset: -0.05, speed: 0.48, phase: Math.PI * 1.2,  freq1: 1.6, freq2: 1.3, amp1: 0.25, amp2: 0.10 },
];

const NAME           = "TANMAY";
const TOTAL_MS       = 3200;   // auto-dismiss after this
const EXIT_MS        = 900;    // fade-out duration

export function IntroAnimation() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const startRef   = useRef<number>(0);

  const [visible,   setVisible]   = useState(true);
  const [exiting,   setExiting]   = useState(false);
  const [showSkip,  setShowSkip]  = useState(false);
  const [mounted,   setMounted]   = useState(false);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem("intro-seen", "1");
    setTimeout(() => setVisible(false), EXIT_MS);
  }, [exiting]);

  /* ── Gate: sessionStorage so it only plays once per session ── */
  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("intro-seen")) { setVisible(false); return; }
    const t1 = setTimeout(() => setShowSkip(true), 700);
    const t2 = setTimeout(dismiss, TOTAL_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Canvas animation ── */
  useEffect(() => {
    if (!visible || !mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Helper: compute ribbon Y points */
    const getPoints = (r: Ribbon, t: number, w: number, h: number): [number, number][] => {
      const pts: [number, number][] = [];
      for (let i = 0; i <= 100; i++) {
        const pct = i / 100;
        const x   = pct * w;
        const y   =
          h * (0.5 + r.yOffset) +
          Math.sin(pct * Math.PI * r.freq1 + t * r.speed + r.phase)          * h * r.amp1 +
          Math.sin(pct * Math.PI * r.freq2 + t * r.speed * 0.6 + r.phase + 1.5) * h * r.amp2;
        pts.push([x, y]);
      }
      return pts;
    };

    /* ── LAYER 1: Volumetric glow blob ── */
    const drawBlob = (t: number, alpha: number) => {
      const w = canvas.width, h = canvas.height;

      // Drifting primary blob
      const bx   = w * 0.5 + Math.sin(t * 0.28) * w * 0.14;
      const by   = h * 0.5 + Math.cos(t * 0.19) * h * 0.09;
      const brad = Math.min(w, h) * (0.72 + Math.sin(t * 0.38) * 0.08);
      const g1   = ctx.createRadialGradient(bx, by, 0, bx, by, brad);
      g1.addColorStop(0,   `rgba(180,  8,  8, ${0.18 * alpha})`);
      g1.addColorStop(0.35,`rgba(120,  4,  4, ${0.10 * alpha})`);
      g1.addColorStop(1,   `rgba(  0,  0,  0, 0)`);
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Smaller secondary blob offset from primary
      const bx2   = w * 0.5 + Math.cos(t * 0.24 + 1.2) * w * 0.11;
      const by2   = h * 0.5 + Math.sin(t * 0.33 + 2.1) * h * 0.07;
      const brad2 = Math.min(w, h) * 0.38;
      const g2    = ctx.createRadialGradient(bx2, by2, 0, bx2, by2, brad2);
      g2.addColorStop(0,   `rgba(220, 38, 38, ${0.20 * alpha})`);
      g2.addColorStop(0.5, `rgba(180, 15, 15, ${0.07 * alpha})`);
      g2.addColorStop(1,   `rgba(  0,  0,  0, 0)`);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    };

    /* ── LAYERS 2-4: Ribbon (outer glow → core → highlight spine) ── */
    const drawRibbon = (r: Ribbon, t: number, progress: number, exitFade: number) => {
      const w = canvas.width, h = canvas.height;
      const pts = getPoints(r, t, w, h);
      const baseAlpha = r.alpha * progress * (1 - exitFade);

      const tracePath = () => {
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      };

      ctx.lineCap  = "round";
      ctx.lineJoin = "round";

      /* Pass A — outermost soft glow halo */
      tracePath();
      ctx.globalAlpha  = baseAlpha * 0.20;
      ctx.strokeStyle  = r.color;
      ctx.lineWidth    = 44;
      ctx.shadowColor  = r.color;
      ctx.shadowBlur   = 90;
      ctx.stroke();

      /* Pass B — mid glow (thick, rich) */
      tracePath();
      ctx.globalAlpha  = baseAlpha * 0.45;
      ctx.lineWidth    = 16;
      ctx.shadowBlur   = 45;
      ctx.stroke();

      /* Pass C — solid ribbon core */
      tracePath();
      ctx.globalAlpha  = baseAlpha * 0.90;
      ctx.lineWidth    = 5;
      ctx.shadowBlur   = 18;
      ctx.stroke();

      /* Pass D — bright highlight spine (white-tinted) */
      tracePath();
      ctx.globalAlpha  = baseAlpha;
      ctx.strokeStyle  = `rgba(255, 200, 200, ${baseAlpha})`;
      ctx.lineWidth    = 1.2;
      ctx.shadowColor  = "#ffffff";
      ctx.shadowBlur   = 10;
      ctx.stroke();

      /* Reset */
      ctx.shadowBlur  = 0;
      ctx.globalAlpha = 1;
    };

    /* ── Animation loop ── */
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const t        = elapsed / 1000;

      // Sweep-in progress (0→1 over first 800 ms)
      const progress = Math.min(elapsed / 800, 1);

      // Exit fade (0→1 only during dismiss phase)
      const exitStart = TOTAL_MS - EXIT_MS;
      const exitFade  = exiting
        ? Math.min((elapsed - exitStart) / EXIT_MS, 1)
        : 0;
      const fade = Math.max(0, exitFade);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Layer 1: blob behind everything
      drawBlob(t, progress * (1 - fade));

      // Layers 2-4: ribbons
      RIBBONS.forEach((r) => drawRibbon(r, t, progress, fade));

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
        transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Canvas holds all ribbon + blob rendering */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Name + subtitle */}
        <div className="relative z-10 flex flex-col items-center gap-5 select-none">
          {/* Letter-by-letter name reveal */}
          <div className="flex" style={{ letterSpacing: "0.45em" }}>
            {NAME.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-white"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize:   "clamp(3.5rem, 9vw, 8.5rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  textShadow:
                    "0 0 80px rgba(220,38,38,0.5), 0 0 30px rgba(220,38,38,0.25), 0 2px 4px rgba(0,0,0,0.8)",
                }}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                transition={{
                  delay:    0.60 + i * 0.075,
                  duration: 0.80,
                  ease:     [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily:    "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
              fontSize:      "0.62rem",
              letterSpacing: "0.38em",
              color:         "rgba(255,255,255,0.32)",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.0 }}
          >
            AI Engineer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; Creator
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute -bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <div
              className="overflow-hidden rounded-full"
              style={{ width: 128, height: 1, background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "rgba(220,38,38,0.55)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay:    1.1,
                  duration: (TOTAL_MS - 1100) / 1000,
                  ease:     "linear",
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
              className="absolute bottom-8 right-8 cursor-pointer transition-colors duration-300"
              style={{
                fontFamily:    "var(--font-jetbrains-mono), monospace",
                fontSize:      "0.62rem",
                letterSpacing: "0.22em",
                color:         "rgba(255,255,255,0.22)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
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
