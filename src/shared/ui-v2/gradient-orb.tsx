import * as React from "react";
import { cn } from "@/shared/utils";

type GradientOrbProps = React.ComponentPropsWithoutRef<"div"> & {
  color?: "cyan" | "purple" | "magenta" | "blue";
};

const colorClasses = {
  cyan: "bg-cyan-300/24",
  purple: "bg-purple-500/24",
  magenta: "bg-fuchsia-400/20",
  blue: "bg-blue-500/22",
};

export function GradientOrb({ className, color = "cyan", ...props }: GradientOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-72 w-72 rounded-full blur-3xl",
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
}
