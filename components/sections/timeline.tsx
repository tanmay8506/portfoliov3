"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/portfolio.config";

export function Timeline() {
  const timeline = CONFIG.timeline || [];

  return (
    <section
      id="timeline"
      className="w-full bg-canvas border-b border-hairline py-24 select-none font-sans scroll-mt-14"
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-12">
        {/* Title */}
        <div>
          <h2 className="text-display-lg font-semibold text-ink tracking-tight">
            Timeline
          </h2>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative border-l border-hairline ml-4 md:ml-32 pl-8 md:pl-12 space-y-12 py-2">
          {timeline.map((entry, idx) => {
            const isFirst = idx === 0;

            return (
              <motion.div
                key={idx}
                className="relative group flex flex-col space-y-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                {/* Connector Dot */}
                <div
                  className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-canvas transition-all duration-300 ${
                    isFirst
                      ? "bg-accent shadow-[0_0_8px_rgba(94,106,210,0.8)]"
                      : "bg-hairline group-hover:bg-hairline-strong"
                  }`}
                />

                {/* Left Offset Year Column (Desktop) */}
                <div className="md:absolute md:-left-[180px] md:top-1 md:w-32 md:text-right select-none">
                  <span
                    className={`text-mono text-body font-semibold ${
                      isFirst ? "text-accent" : "text-ink-subtle"
                    }`}
                  >
                    {entry.year}
                  </span>
                </div>

                {/* Mobile Year Badge */}
                <div className="md:hidden select-none">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm text-mono text-xs font-semibold ${
                      isFirst
                        ? "bg-accent/10 text-accent border border-accent/20"
                        : "bg-surface-2 border border-hairline text-ink-subtle"
                    }`}
                  >
                    {entry.year}
                  </span>
                </div>

                {/* Entry Title & Subtitle */}
                <div>
                  <h3 className="text-headline font-semibold text-ink leading-snug">
                    {entry.title}
                  </h3>
                  <p className="text-body-sm text-accent-hover font-medium mt-0.5">
                    {entry.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-body text-ink-muted leading-relaxed max-w-[65ch]">
                  {entry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
