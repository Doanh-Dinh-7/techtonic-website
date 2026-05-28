import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/utils";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "cyan" | "purple" | "magenta" | "ghost";
};

const variantClasses = {
  cyan: "border-cyan-300/60 bg-cyan-300/10 text-cyan-50 shadow-[0_0_26px_rgba(0,245,255,0.22)] hover:bg-cyan-300/18 hover:shadow-[0_0_34px_rgba(0,245,255,0.32)]",
  purple:
    "border-purple-400/60 bg-purple-400/10 text-purple-50 shadow-[0_0_26px_rgba(168,85,247,0.22)] hover:bg-purple-400/18 hover:shadow-[0_0_34px_rgba(168,85,247,0.32)]",
  magenta:
    "border-fuchsia-400/60 bg-fuchsia-400/10 text-fuchsia-50 shadow-[0_0_26px_rgba(255,43,214,0.2)] hover:bg-fuchsia-400/18 hover:shadow-[0_0_34px_rgba(255,43,214,0.3)]",
  ghost:
    "border-white/15 bg-white/[0.04] text-white hover:border-cyan-300/50 hover:bg-white/[0.08]",
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
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
