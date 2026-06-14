"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/portfolio.config";

export function RotatingBadge() {
  const [index, setIndex] = useState(0);
  const items = CONFIG.currentlyBuilding || ["AlgoGenie v2", "LitRev v2"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-1 border border-hairline rounded-full select-none text-mono text-xs w-fit">
      <span className="text-ink-subtle">Currently building</span>
      <span className="text-accent font-semibold">→</span>
      <div className="h-4 overflow-hidden relative min-w-[90px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-ink font-semibold whitespace-nowrap absolute"
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
