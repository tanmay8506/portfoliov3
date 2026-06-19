"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME     = "TANMAY";
const EXIT_MS  = 900;

export function IntroAnimation() {
  const [visible,  setVisible]  = useState(true);
  const [exiting,  setExiting]  = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [duration, setDuration] = useState(6.0); // fallback default
  const [videoPlaying, setVideoPlaying] = useState(false);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem("intro-seen", "1");
    setTimeout(() => setVisible(false), EXIT_MS);
  }, [exiting]);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("intro-seen")) {
      setVisible(false);
      return;
    }
    const t1 = setTimeout(() => setShowSkip(true), 700);
    // Safety fallback in case video fails or gets stuck
    const fallbackTimeout = setTimeout(dismiss, 10000);

    return () => {
      clearTimeout(t1);
      clearTimeout(fallbackTimeout);
    };
  }, [dismiss]);

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#000000" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.video
          src="/intro-ribbon.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ mixBlendMode: "screen" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoPlaying ? 0.9 : 0 }}
          transition={{ duration: 0.8 }}
          onPlay={() => setVideoPlaying(true)}
          onEnded={dismiss}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration);
          }}
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
                  duration: Math.max(0.1, duration - 1.2 - (EXIT_MS / 1000)),
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
