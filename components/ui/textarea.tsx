import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-24 w-full rounded-md border border-hairline bg-surface-2 px-3 py-2 text-body font-sans text-ink placeholder:text-ink-tertiary transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-hairline-strong disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
