import * as React from "react";
import { cn } from "@/shared/utils";

type GlassCardProps = React.ComponentPropsWithoutRef<"div"> & {
  glow?: "cyan" | "purple" | "magenta" | "yellow" | "green" | "none";
};

const glowClasses = {
  cyan: "shadow-[0_0_36px_rgba(0,245,255,0.16)] hover:shadow-[0_0_48px_rgba(0,245,255,0.22)]",
  purple: "shadow-[0_0_36px_rgba(168,85,247,0.16)] hover:shadow-[0_0_48px_rgba(168,85,247,0.22)]",
  magenta: "shadow-[0_0_36px_rgba(255,43,214,0.14)] hover:shadow-[0_0_48px_rgba(255,43,214,0.2)]",
  yellow: "shadow-[0_0_36px_rgba(255,215,0,0.16)] hover:shadow-[0_0_48px_rgba(255,215,0,0.22)]",
  green: "shadow-[0_0_36px_rgba(0,255,128,0.16)] hover:shadow-[0_0_48px_rgba(0,255,128,0.22)]",
  none: "",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = "cyan", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[var(--v2-glass-border)] bg-[var(--v2-glass-surface)] text-foreground backdrop-blur-2xl transition duration-300",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_35%,rgba(0,245,255,0.12))] before:opacity-70",
        "focus-within:ring-2 focus-within:ring-cyan-300/70",
        glowClasses[glow],
        className
      )}
      {...props}
    />
  )
);

GlassCard.displayName = "GlassCard";
