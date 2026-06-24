"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/portfolio.config";
import { ProjectCard } from "@/components/shared/project-card";
import { RotatingBadge } from "@/components/shared/rotating-badge";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Agentic AI", "Full-Stack", "ML + Data"] as const;

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const projects = CONFIG.projects.map((proj) => {
    // Map grid areas for desktop bento grid layout
    let gridArea = "";
    if (proj.id === "algogenie") {
      gridArea = "md:col-span-2 md:row-span-1";
    } else if (proj.id === "vibe-coder") {
      gridArea = "md:col-span-2 md:row-span-1";
    } else if (proj.id === "langgraph-hitl") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "rag-queue") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "the-ink") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "flight-finder") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "arm-artistry") {
      gridArea = "md:col-span-2 md:row-span-1";
    } else if (proj.id === "litrev") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "personabot") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "hr-absenteeism") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "visionary") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "studyai") {
      gridArea = "md:col-span-2 md:row-span-1";
    }

    return {
      ...proj,
      gridArea,
    };
  });

  return (
    <section
      id="projects"
      className="w-full theme-dark border-b border-hairline py-24 select-none font-sans scroll-mt-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-8"
      >
        {/* Header Block: Rotating badge + H2 */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-end md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-2">
            {/* Rotating build badge */}
            <RotatingBadge />
            <h2 className="text-display-lg font-semibold text-ink tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-canvas/30 p-1 border border-hairline rounded-full w-fit relative">
            {CATEGORIES.map((cat) => {
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-body-sm font-medium transition-all duration-200 cursor-pointer outline-hidden relative z-10 focus-visible:ring-2 focus-visible:ring-accent/50",
                    isActive
                      ? "text-ink font-semibold"
                      : "text-ink-subtle hover:text-ink"
                  )}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-surface-2 border border-hairline rounded-full"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          <AnimatePresence mode="popLayout">
            {projects
              .filter((proj) => selectedFilter === "All" || proj.category === selectedFilter)
              .map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("h-full", project.gridArea)}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
