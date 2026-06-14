import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          // Variants
          {
            "bg-accent hover:bg-accent-hover text-ink shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_12px_rgba(94,106,210,0.3)] active:scale-[0.98]":
              variant === "primary",
            "bg-surface-2 hover:bg-surface-3 text-ink border border-hairline hover:border-hairline-strong active:scale-[0.98]":
              variant === "secondary",
            "bg-transparent hover:bg-surface-2 text-ink-muted hover:text-ink":
              variant === "ghost",
          },
          // Sizes
          {
            "px-3 py-1.5 text-body-sm rounded-sm": size === "sm",
            "px-4 py-2 text-body rounded-md": size === "md",
            "px-6 py-3 text-body-lg rounded-md": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
