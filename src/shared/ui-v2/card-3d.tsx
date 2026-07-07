"use client";

import * as React from "react";
import { cn } from "@/shared/utils";
import { useReducedMotionPreference } from "@/hooks/use3d";

type Card3DProps = React.ComponentPropsWithoutRef<"div"> & {
  intensity?: number;
};

export function Card3D({
  children,
  className,
  intensity = 10,
  onMouseLeave,
  onMouseMove,
  style,
  ...props
}: Card3DProps) {
  const reducedMotion = useReducedMotionPreference();
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: Number((-y * intensity).toFixed(2)),
      y: Number((x * intensity).toFixed(2)),
    });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn("group perspective-[1200px]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        className="h-full rounded-3xl transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
