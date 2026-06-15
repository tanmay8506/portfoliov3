"use client";

import React, { useState } from "react";
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
    } else if (proj.id === "litrev") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "personabot") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "hr-absenteeism") {
      gridArea = "md:col-span-1 md:row-span-1";
    } else if (proj.id === "visionary") {
      gridArea = "md:col-span-1 md:row-span-2";
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
      className="py-24 max-w-[1280px] mx-auto px-6 select-none font-sans scroll-mt-14"
    >
      <div className="flex flex-col space-y-8">
        {/* Header Block: Rotating badge + H2 */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-end md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-2">
            {/* Rotating build badge */}
            <RotatingBadge />
            <h2 className="text-display-lg font-semibold text-ink tracking-tight">
              Selected Work
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-canvas/30 p-1 border border-hairline rounded-full w-fit">
            {CATEGORIES.map((cat) => {
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-body-sm font-medium transition-all duration-200 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50",
                    isActive
                      ? "bg-surface-2 border border-hairline text-ink font-semibold"
                      : "bg-transparent border border-transparent text-ink-subtle hover:text-ink"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {projects.map((project) => {
            const matchesFilter =
              selectedFilter === "All" || project.category === selectedFilter;

            return (
              <div
                key={project.id}
                className={cn(
                  "transition-all duration-500 transform",
                  project.gridArea,
                  matchesFilter
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-25 pointer-events-none scale-[0.98] blur-[1px]"
                )}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
