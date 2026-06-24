"use client";
import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/portfolio.config";

export function About() {
  const stats = CONFIG.aboutStats || {
    projectsBuilt: "12+",
    certifications: "4",
    yearsCoding: "3+",
    repositories: "15+",
  };

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
      id="about"
      className="w-full border-b border-hairline py-24 select-none font-sans scroll-mt-14"
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-12">
        {/* Title */}
        <div className="flex items-center space-x-4">
          <h2 className="text-display-lg font-semibold text-ink tracking-tight">
            About Me
          </h2>
          <div className="h-px bg-hairline flex-grow max-w-[200px]" />
        </div>

        {/* Two-Column Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Left Column: Professional Summary (7 cols) */}
          <motion.div className="md:col-span-7 flex flex-col space-y-6" variants={itemVariants}>
            <p className="text-body-lg text-ink-muted leading-relaxed text-balance">
              I am a New Delhi-based <strong className="text-ink font-semibold">AI Product Engineer</strong> specializing in the architecture of stateful, autonomous multi-agent systems and full-stack AI products.
            </p>
            <p className="text-body text-ink-subtle leading-relaxed">
              My work focuses on bridging the gap between raw AI capabilities and reliable, production-ready software. Instead of building superficial AI wrapper demos, I design robust agentic loops using <strong className="text-ink font-semibold">AutoGen</strong> and <strong className="text-ink font-semibold">LangGraph</strong>, containerize code execution inside secure <strong className="text-ink font-semibold">Docker sandboxes</strong>, and configure high-performance, asynchronous RAG ingestion pipelines.
            </p>
            <p className="text-body text-ink-subtle leading-relaxed">
              Obsessed with system observability, latency reduction, and deterministic flow control, I ensure that the probabilistic outputs of large language models are safely bounded and integrated within elegant, high-fidelity user experiences.
            </p>
          </motion.div>

          {/* Right Column: Core Stats (5 cols) */}
          <motion.div className="md:col-span-5" variants={itemVariants}>
            <div className="bg-surface-1 border border-hairline rounded-xl p-6 space-y-6">
              <h3 className="text-headline font-semibold text-ink">
                Telemetry Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-2/40 border border-hairline/60 rounded-lg p-4 text-center hover:border-hairline-strong transition-colors duration-200">
                  <div className="text-display-md font-semibold text-accent">
                    {stats.projectsBuilt}
                  </div>
                  <div className="text-body-sm text-ink-subtle mt-1 font-medium">
                    Projects Built
                  </div>
                </div>
                <div className="bg-surface-2/40 border border-hairline/60 rounded-lg p-4 text-center hover:border-hairline-strong transition-colors duration-200">
                  <div className="text-display-md font-semibold text-accent">
                    {stats.certifications}
                  </div>
                  <div className="text-body-sm text-ink-subtle mt-1 font-medium">
                    Certifications
                  </div>
                </div>
                <div className="bg-surface-2/40 border border-hairline/60 rounded-lg p-4 text-center hover:border-hairline-strong transition-colors duration-200">
                  <div className="text-display-md font-semibold text-accent">
                    {stats.yearsCoding}
                  </div>
                  <div className="text-body-sm text-ink-subtle mt-1 font-medium">
                    Years Coding
                  </div>
                </div>
                <div className="bg-surface-2/40 border border-hairline/60 rounded-lg p-4 text-center hover:border-hairline-strong transition-colors duration-200">
                  <div className="text-display-md font-semibold text-accent">
                    {stats.repositories}
                  </div>
                  <div className="text-body-sm text-ink-subtle mt-1 font-medium">
                    Repositories
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
