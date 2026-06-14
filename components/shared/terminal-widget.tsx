"use client";

import React, { useEffect, useState, useRef } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "info" | "success" | "warning";
  prefix?: string;
}

const BOOT_SEQUENCE: TerminalLine[] = [
  { text: "init", type: "input", prefix: "agent@algogenie ~ $ " },
  { text: "> loading tools...", type: "info" },
  { text: "> 12 tools registered", type: "info" },
  { text: "> 3 agents spawned", type: "info" },
  { text: "> session ready ✓", type: "success" },
];

export function TerminalWidget() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Tab visibility check helper
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearTimeout(timerRef.current);
      } else {
        // Resume trigger
        triggerNextStep();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    triggerNextStep();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentLineIndex, charIndex, isWaiting]);

  const triggerNextStep = () => {
    if (document.hidden) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    // If we've shown all lines and are waiting to restart
    if (currentLineIndex >= BOOT_SEQUENCE.length) {
      if (!isWaiting) {
        setIsWaiting(true);
        timerRef.current = setTimeout(() => {
          setLines([]);
          setCurrentLineIndex(0);
          setCharIndex(0);
          setCurrentLineText("");
          setIsWaiting(false);
        }, 3000); // 3 seconds pause at completion
      }
      return;
    }

    const currentLine = BOOT_SEQUENCE[currentLineIndex];

    // Input line (like typing "init") has character-by-character typewriter effect
    if (currentLine.type === "input") {
      if (charIndex < currentLine.text.length) {
        timerRef.current = setTimeout(() => {
          setCurrentLineText((prev) => prev + currentLine.text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 80); // 80ms per char for typing input
      } else {
        // Finished typing the input line, commit it to history list
        timerRef.current = setTimeout(() => {
          setLines((prev) => [...prev, { ...currentLine, text: currentLine.text }]);
          setCurrentLineIndex((prev) => prev + 1);
          setCharIndex(0);
          setCurrentLineText("");
        }, 500); // Wait 500ms after typing before executing
      }
    } else {
      // Info/Success lines appear with a slight delay per line
      timerRef.current = setTimeout(() => {
        setLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 600); // 600ms boot sequence delay between outputs
    }
  };

  return (
    <div className="w-full max-w-lg bg-surface-1 border border-hairline rounded-xl overflow-hidden font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none">
      {/* Chrome Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-2 border-b border-hairline">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e] opacity-80" />
        </div>
        <span className="text-body-sm text-ink-subtle font-medium select-none">
          agent@algogenie ~
        </span>
        <div className="w-12" /> {/* spacer for center alignment */}
      </div>

      {/* Terminal Screen */}
      <div className="p-5 min-h-48 text-mono text-body-sm flex flex-col space-y-2.5 overflow-y-auto leading-relaxed">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={
              line.type === "success"
                ? "text-success font-semibold"
                : line.type === "input"
                ? "text-ink"
                : "text-ink-muted"
            }
          >
            {line.prefix}
            {line.text}
          </div>
        ))}

        {/* Current typing line */}
        {currentLineIndex < BOOT_SEQUENCE.length &&
          BOOT_SEQUENCE[currentLineIndex].type === "input" && (
            <div className="text-ink">
              {BOOT_SEQUENCE[currentLineIndex].prefix}
              {currentLineText}
              <span className="inline-block w-1.5 h-4 bg-accent ml-0.5 animate-pulse" />
            </div>
          )}

        {/* Running cursor when idle or waiting */}
        {currentLineIndex >= BOOT_SEQUENCE.length && (
          <div className="text-ink-muted">
            <span className="inline-block w-1.5 h-4 bg-ink-subtle ml-0.5 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
