"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/portfolio.config";
import { StatusPill } from "@/components/shared/status-pill";
import { TerminalWidget } from "@/components/shared/terminal-widget";
import { Button } from "@/components/ui/button";

export function Hero() {
  const handleWorkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("projects");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Framer motion animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-16 overflow-hidden max-w-[1280px] mx-auto px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full z-10">
        {/* Left Column (55% / 7 cols) */}
        <motion.div
          className="flex flex-col space-y-6 md:col-span-7 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Element 1: Status Pill */}
          <motion.div variants={itemVariants}>
            <StatusPill />
          </motion.div>

          {/* Element 2: H1 Title */}
          <motion.h1
            className="text-display-xl font-sans font-semibold text-ink tracking-tight leading-[1.08] text-balance"
            variants={itemVariants}
          >
            Building AI Agents <br />
            <span className="text-accent">That Actually Work.</span>
          </motion.h1>

          {/* Element 3: Subheading */}
          <motion.p
            className="text-body-lg text-ink-muted leading-relaxed max-w-[52ch]"
            variants={itemVariants}
          >
            {CONFIG.subhead ||
              "Python + LangGraph + AutoGen. Multi-agent systems shipped to production, not demos."}
          </motion.p>

          {/* Element 4: Action Buttons */}
          <motion.div className="flex items-center space-x-4 pt-2" variants={itemVariants}>
            <Button variant="primary" onClick={handleWorkClick}>
              View My Work
            </Button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-hidden"
            >
              <Button variant="secondary">Resume →</Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column (45% / 5 cols) */}
        <motion.div
          className="hidden md:flex justify-end md:col-span-5"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <TerminalWidget />
        </motion.div>
      </div>
    </section>
  );
}
