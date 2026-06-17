"use client";

import React from "react";
import { CONFIG } from "@/portfolio.config";
import { SkillBar } from "@/components/shared/skill-bar";
import { Terminal } from "lucide-react";

export function Skills() {
  const skills = CONFIG.skills || [];
  const tools = CONFIG.tools || [];
  const ticker = CONFIG.agentTicker || { tools: 12, agents: 3 };

  return (
    <section
      id="skills"
      className="w-full bg-canvas border-b border-hairline py-24 select-none font-sans scroll-mt-14"
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-12">
        {/* Title */}
        <div>
          <h2 className="text-display-lg font-semibold text-ink tracking-tight">
            Competencies & Tooling
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Skill Bars (7 cols) */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            <h3 className="text-headline font-semibold text-ink-muted">
              Core Skills
            </h3>
            <div className="space-y-5">
              {skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          {/* Right Column: Tool Cloud & Agent Telemetry Dashboard (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-8">
            {/* Tool Tags Cloud */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-headline font-semibold text-ink-muted">
                Frameworks & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-sm bg-surface-1 border border-hairline/60 text-mono text-xs text-ink-muted hover:border-hairline-strong transition-colors duration-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Agent Telemetry console */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-headline font-semibold text-ink-muted">
                Telemetry Log
              </h3>
              <div className="bg-surface-1 border border-hairline rounded-xl p-5 font-mono text-body-sm text-ink-muted space-y-3.5 shadow-md">
                <div className="flex items-center space-x-2 border-b border-hairline/50 pb-2">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span className="text-ink font-semibold">sys_agent_telemetry.log</span>
                </div>
                <div className="space-y-1.5 leading-relaxed text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-subtle">Active Orchestrator</span>
                    <span className="text-accent font-semibold">LangGraph / AutoGen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-subtle">Tool Integration Count</span>
                    <span className="text-ink font-semibold">{ticker.tools} active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-subtle">Agent Instances Online</span>
                    <span className="text-ink font-semibold">{ticker.agents} nodes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-subtle">Environment Sandbox</span>
                    <span className="text-success font-semibold">Docker Isolator v2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-subtle">System Uptime</span>
                    <span className="text-ink">99.98% (Simulation)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
