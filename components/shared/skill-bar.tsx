"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Skill } from "@/portfolio.config";

interface SkillBarProps {
  skill: Skill;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

const barVariants: Variants = {
  hidden: { width: 0 },
  visible: (pct: number) => ({
    width: `${pct}%`,
    transition: { duration: 0.95, ease: "easeOut" }
  })
};

export function SkillBar({ skill }: SkillBarProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="w-full flex flex-col space-y-2 font-sans select-none"
    >
      {/* Label & Level info */}
      <div className="flex items-center justify-between text-body-sm font-medium">
        <span className="text-ink font-semibold">{skill.name}</span>
        <span className="text-ink-subtle text-mono text-xs">{skill.level}</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-surface-3 rounded-xs overflow-hidden border border-hairline/20">
        <motion.div
          className="h-full bg-accent rounded-xs shadow-[0_0_8px_rgba(94,106,210,0.5)]"
          custom={skill.percentage}
          variants={barVariants}
        />
      </div>
    </motion.div>
  );
}
