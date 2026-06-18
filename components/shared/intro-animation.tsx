"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Each ribbon is a cubic Bezier: start → cp1 → cp2 → end.
   Control points drift slowly — giving organic, silk-like motion.
   We draw 3 passes per ribbon (halo → body → spine).
───────────────────────────────────────────── */
interface RibbonDef {
  color: string;
  alpha: number;
  // Bezier end-points as fractions of [w, h], optionally time-varying
  sx: (w: number, h: number, t: number) => number;
  sy: (w: number, h: number, t: number) => number;
  cp1x: (w: number, h: number, t: number) => number;
  cp1y: (w: number, h: number, t: number) => number;
  cp2x: (w: number, h: number, t: number) => number;
  cp2y: (w: number, h: number, t: number) => number;
  ex: (w: number, h: number, t: number) => number;
  ey: (w: number, h: number, t: number) => number;
}

const RIBBONS: RibbonDef[] = [
  // ── Ribbon 1: gentle S-sweep from bottom-left to top-right (primary)
  {
    color: "#dc2626",
    alpha: 1.0,
    sx:   (w)         => -w * 0.02,
    sy:   (_, h, t)   => h * (0.62 + Math.sin(t * 0.22) * 0.06),
    cp1x: (w, _, t)   => w * (0.28 + Math.sin(t * 0.17 + 0.5) * 0.06),
    cp1y: (_, h, t)   => h * (0.18 + Math.cos(t * 0.14) * 0.07),
    cp2x: (w, _, t)   => w * (0.72 + Math.cos(t * 0.19 + 1.0) * 0.06),
    cp2y: (_, h, t)   => h * (0.82 + Math.sin(t * 0.16 + 2.0) * 0.06),
    ex:   (w)         => w * 1.02,
    ey:   (_, h, t)   => h * (0.38 + Math.cos(t * 0.21) * 0.05),
  },
  // ── Ribbon 2: reverse sweep top-left → bottom-right (secondary)
  {
    color: "#ef4444",
    alpha: 0.72,
    sx:   (w)         => -w * 0.02,
    sy:   (_, h, t)   => h * (0.28 + Math.cos(t * 0.18 + 1.2) * 0.06),
    cp1x: (w, _, t)   => w * (0.30 + Math.cos(t * 0.13 + 0.8) * 0.07),
    cp1y: (_, h, t)   => h * (0.75 + Math.sin(t * 0.20 + 0.3) * 0.07),
    cp2x: (w, _, t)   => w * (0.68 + Math.sin(t * 0.15 + 1.8) * 0.06),
    cp2y: (_, h, t)   => h * (0.25 + Math.cos(t * 0.18 + 1.5) * 0.07),
    ex:   (w)         => w * 1.02,
    ey:   (_, h, t)   => h * (0.72 + Math.sin(t * 0.23 + 0.7) * 0.05),
  },
  // ── Ribbon 3: subtle arc low in the frame (depth layer)
  {
    color: "#b91c1c",
    alpha: 0.50,
    sx:   (w)         => -w * 0.02,
    sy:   (_, h, t)   => h * (0.80 + Math.sin(t * 0.16 + 2.5) * 0.05),
    cp1x: (w, _, t)   => w * (0.22 + Math.sin(t * 0.12 + 1.0) * 0.08),
    cp1y: (_, h, t)   => h * (0.45 + Math.cos(t * 0.19 + 0.6) * 0.10),
    cp2x: (w, _, t)   => w * (0.78 + Math.cos(t * 0.14 + 2.0) * 0.07),
    cp2y: (_, h, t)   => h * (0.55 + Math.sin(t * 0.17 + 1.3) * 0.09),
    ex:   (w)         => w * 1.02,
    ey:   (_, h, t)   => h * (0.20 + Math.cos(t * 0.20 + 0.9) * 0.05),
  },
];

const NAME     = "TANMAY";
const TOTAL_MS = 3400;
const EXIT_MS  = 900;

export function IntroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  const [visible,  setVisible]  = useState(true);
  const [exiting,  setExiting]  = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem("intro-seen", "1");
    setTimeout(() => setVisible(false), EXIT_MS);
  }, [exiting]);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("intro-seen")) { setVisible(false); return; }
    const t1 = setTimeout(() => setShowSkip(true), 700);
    const t2 = setTimeout(dismiss, TOTAL_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    /* ── Draw one ribbon (3 glow passes) ── */
    const drawRibbon = (
      r: RibbonDef,
      t: number,
      progress: number,
      exitFade: number,
    ) => {
      const w = canvas.width, h = canvas.height;
      const alpha = r.alpha * progress * (1 - exitFade);

      const sx   = r.sx(w, h, t);
      const sy   = r.sy(w, h, t);
      const cp1x = r.cp1x(w, h, t);
      const cp1y = r.cp1y(w, h, t);
      const cp2x = r.cp2x(w, h, t);
      const cp2y = r.cp2y(w, h, t);
      const ex   = r.ex(w, h, t);
      const ey   = r.ey(w, h, t);

      const draw = () => {
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
      };

      /* Pass 1 – wide outer halo */
      draw();
      ctx.globalAlpha = alpha * 0.18;
      ctx.strokeStyle = r.color;
      ctx.lineWidth   = 55;
      ctx.shadowColor = r.color;
      ctx.shadowBlur  = 80;
      ctx.lineCap     = "round";
      ctx.stroke();

      /* Pass 2 – core glow body */
      draw();
      ctx.globalAlpha = alpha * 0.55;
      ctx.lineWidth   = 16;
      ctx.shadowBlur  = 35;
      ctx.stroke();

      /* Pass 3 – bright central spine */
      draw();
      ctx.globalAlpha = alpha * 0.95;
      ctx.lineWidth   = 3;
      ctx.shadowBlur  = 12;
      ctx.stroke();

      /* Pass 4 – white hot highlight */
      draw();
      ctx.globalAlpha = alpha * 0.70;
      ctx.strokeStyle = `rgba(255,200,200,${alpha * 0.70})`;
      ctx.lineWidth   = 1;
      ctx.shadowColor = "#fff";
      ctx.shadowBlur  = 6;
      ctx.stroke();

      ctx.shadowBlur  = 0;
      ctx.globalAlpha = 1;
    };

    /* ── Subtle ambient glow (very restrained) ── */
    const drawAmbient = (t: number, alpha: number) => {
      const w = canvas.width, h = canvas.height;
      const cx = w * 0.5 + Math.sin(t * 0.18) * w * 0.08;
      const cy = h * 0.5 + Math.cos(t * 0.14) * h * 0.06;
      const r  = Math.min(w, h) * 0.55;
      const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0,   `rgba(160, 5, 5, ${0.10 * alpha})`);
      g.addColorStop(0.5, `rgba(100, 3, 3, ${0.05 * alpha})`);
      g.addColorStop(1,   `rgba(0,   0, 0,  0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    /* ── Main render loop ── */
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const t        = elapsed / 1000;

      // 0 → 1 over first 900 ms (sweep-in)
      const progress = Math.min(elapsed / 900, 1);
      // Ease: smooth step
      const smoothProgress = progress * progress * (3 - 2 * progress);

      // Exit fade
      const exitStart = TOTAL_MS - EXIT_MS;
      const exitFade  = exiting
        ? Math.max(0, Math.min((elapsed - exitStart) / EXIT_MS, 1))
        : 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawAmbient(t, smoothProgress * (1 - exitFade));
      RIBBONS.forEach((r) => drawRibbon(r, t, smoothProgress, exitFade));

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
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Name + subtitle */}
        <div className="relative z-10 flex flex-col items-center gap-5 select-none">

          {/* TANMAY — staggered letter reveal */}
          <div className="flex" style={{ letterSpacing: "0.5em" }}>
            {NAME.split("").map((letter, i) => (
              <motion.span
                key={i}
                className="text-white"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize:   "clamp(4rem, 10vw, 9rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  textShadow:
                    "0 0 80px rgba(220,38,38,0.5), 0 0 30px rgba(220,38,38,0.2), 0 2px 8px rgba(0,0,0,0.9)",
                }}
                initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                transition={{
                  delay:    0.65 + i * 0.08,
                  duration: 0.85,
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
              fontSize:      "0.60rem",
              letterSpacing: "0.40em",
              color:         "rgba(255,255,255,0.28)",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.0 }}
          >
            AI Engineer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; Creator
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute -bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 100, height: 1, background: "rgba(255,255,255,0.07)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "rgba(220,38,38,0.6)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  delay:    1.2,
                  duration: (TOTAL_MS - 1200) / 1000,
                  ease:     "linear",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Skip */}
        <AnimatePresence>
          {showSkip && !exiting && (
            <motion.button
              onClick={dismiss}
              className="absolute bottom-8 right-8 cursor-pointer transition-colors duration-300"
              style={{
                fontFamily:    "var(--font-jetbrains-mono), monospace",
                fontSize:      "0.60rem",
                letterSpacing: "0.22em",
                color:         "rgba(255,255,255,0.20)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.20)")}
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
