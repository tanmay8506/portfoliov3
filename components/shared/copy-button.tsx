"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={cn(
        "inline-flex items-center space-x-2 px-3.5 py-2 rounded-md bg-surface-2 border border-hairline hover:bg-surface-3 hover:border-hairline-strong active:scale-98 transition-all duration-200 text-body-sm font-medium text-ink-muted hover:text-ink cursor-pointer select-none",
        copied && "border-success/30 hover:border-success/50",
        className
      )}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-success animate-scaleIn" />
          <span className="text-success font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-ink-subtle group-hover:text-ink transition-colors duration-200" />
          <span>Copy email</span>
        </>
      )}
    </button>
  );
}
