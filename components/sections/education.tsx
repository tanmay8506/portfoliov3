"use client";
import React from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/portfolio.config";

export function Education() {
  const education = CONFIG.education || [];

  return (
    <section
      id="education"
      className="w-full bg-canvas border-b border-hairline py-24 select-none font-sans scroll-mt-14"
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-12">
        {/* Title */}
        <div className="flex items-center space-x-4">
          <h2 className="text-display-lg font-semibold text-ink tracking-tight">
            Education
          </h2>
          <div className="h-px bg-hairline flex-grow max-w-[200px]" />
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative border-l border-hairline ml-4 pl-8 space-y-12 py-2 max-w-[800px]">
          {education.map((entry, idx) => {
            const isFirst = idx === 0;
            return (
              <motion.div
                key={idx}
                className="relative group flex flex-col space-y-1.5"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                {/* Connector Dot */}
                <div
                  className={`absolute -left-[40px] top-1 w-4 h-4 rounded-full border-4 border-canvas transition-all duration-300 ${
                    isFirst
                      ? "bg-accent shadow-[0_0_8px_rgba(94,106,210,0.8)]"
                      : "bg-hairline group-hover:bg-hairline-strong"
                  }`}
                />

                {/* Years Range */}
                <span className="text-mono text-body-sm font-semibold text-accent">
                  {entry.years}
                </span>

                {/* Degree & School */}
                <div>
                  <h3 className="text-headline font-semibold text-ink leading-snug">
                    {entry.degree}
                  </h3>
                  <p className="text-body text-ink-subtle font-medium mt-0.5">
                    {entry.institution}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
