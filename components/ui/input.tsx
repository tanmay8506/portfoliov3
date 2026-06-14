import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-hairline bg-surface-2 px-3 py-2 text-body font-sans text-ink placeholder:text-ink-tertiary transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-hairline-strong disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
