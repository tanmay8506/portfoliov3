"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bot, BarChart3, Code2, Globe, Cpu } from "lucide-react";
import { CONFIG } from "@/portfolio.config";

export function Certifications() {
  const certifications = CONFIG.certifications || [];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "robot":
        return <Bot className="w-5 h-5 text-accent" />;
      case "chart":
        return <BarChart3 className="w-5 h-5 text-accent" />;
      case "code":
        return <Code2 className="w-5 h-5 text-accent" />;
      case "globe":
        return <Globe className="w-5 h-5 text-accent" />;
      default:
        return <Cpu className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section
      id="certifications"
      className="w-full border-b border-hairline py-24 select-none font-sans scroll-mt-14"
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-12">
        {/* Title */}
        <div className="flex items-center space-x-4">
          <h2 className="text-display-lg font-semibold text-ink tracking-tight">
            Certifications
          </h2>
          <div className="h-px bg-hairline flex-grow max-w-[200px]" />
        </div>

        {/* List of cards */}
        <div className="flex flex-col space-y-4 max-w-[800px] w-full">
          {certifications.map((entry, idx) => (
            <motion.div
              key={idx}
              className="bg-surface-1 border border-hairline rounded-xl p-5 flex items-center hover:border-accent/30 hover:bg-surface-2/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-surface-2 border border-hairline flex items-center justify-center flex-shrink-0 group-hover:border-accent/20 transition-colors">
                {getIcon(entry.icon)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 pl-4">
                <h3 className="text-body font-semibold text-ink leading-snug truncate">
                  {entry.title}
                </h3>
                <p className="text-body-sm text-ink-subtle mt-0.5 font-medium">
                  {entry.issuer}
                </p>
              </div>

              {/* Year */}
              <div className="text-right select-none pl-4">
                <span className="text-mono text-body font-semibold text-accent group-hover:text-accent-hover transition-colors">
                  {entry.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
