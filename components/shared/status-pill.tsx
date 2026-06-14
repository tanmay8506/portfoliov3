"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  className?: string;
}

export function StatusPill({ className }: StatusPillProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Find the first input in the contact form and focus it
      const nameInput = document.getElementById("contact-name");
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 800); // Wait for scroll transition to complete
      }
    }
  };

  return (
    <a
      href="#contact"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center space-x-2.5 px-3 py-1 bg-surface-1 border border-hairline hover:border-hairline-strong rounded-full transition-all duration-200 group text-body-sm text-ink-muted hover:text-ink cursor-pointer w-fit shadow-xs",
        className
      )}
    >
      {/* Animated Green Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      <span className="font-sans font-medium tracking-wide">
        Available for opportunities
      </span>
    </a>
  );
}
