import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "cyan" | "purple" | "magenta" | "ghost";
};

const variantClasses = {
  cyan: "border-cyan-500/50 bg-cyan-500/10 text-cyan-800 shadow-[0_0_26px_rgba(0,245,255,0.16)] hover:bg-cyan-500/15 hover:shadow-[0_0_34px_rgba(0,245,255,0.24)] dark:border-cyan-300/60 dark:bg-cyan-300/10 dark:text-cyan-50",
  purple:
    "border-purple-500/50 bg-purple-500/10 text-purple-800 shadow-[0_0_26px_rgba(168,85,247,0.16)] hover:bg-purple-500/15 hover:shadow-[0_0_34px_rgba(168,85,247,0.24)] dark:border-purple-400/60 dark:bg-purple-400/10 dark:text-purple-50",
  magenta:
    "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-800 shadow-[0_0_26px_rgba(255,43,214,0.16)] hover:bg-fuchsia-500/15 hover:shadow-[0_0_34px_rgba(255,43,214,0.24)] dark:border-fuchsia-400/60 dark:bg-fuchsia-400/10 dark:text-fuchsia-50",
  ghost:
    "border-border bg-background/70 text-foreground hover:border-cyan-500/40 hover:bg-accent dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-cyan-300/50 dark:hover:bg-white/[0.08]",
};

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ asChild, className, variant = "cyan", type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-wide transition duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

NeonButton.displayName = "NeonButton";
