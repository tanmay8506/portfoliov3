"use client";

import React from "react";
import { motion } from "framer-motion";
import { Skill } from "@/portfolio.config";

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="w-full flex flex-col space-y-2 font-sans select-none">
      {/* Label & Level info */}
      <div className="flex items-center justify-between text-body-sm font-medium">
        <span className="text-ink font-semibold">{skill.name}</span>
        <span className="text-ink-subtle text-mono text-xs">{skill.level}</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-surface-3 rounded-xs overflow-hidden border border-hairline/20">
        <motion.div
          className="h-full bg-accent rounded-xs shadow-[0_0_8px_rgba(94,106,210,0.5)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
