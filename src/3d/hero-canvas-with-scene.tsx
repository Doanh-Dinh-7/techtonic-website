"use client";

import { CanvasShell } from "@/3d/canvas/canvas-shell";
import { HeroScene } from "@/3d/scenes/hero-scene";

type HeroCanvasWithSceneProps = {
  className?: string;
  fallbackClassName?: string;
};

/** Canvas + hero scene — loaded as one client chunk (see `hero-media.tsx`). */
export function HeroCanvasWithScene({ className, fallbackClassName }: HeroCanvasWithSceneProps) {
  return (
    <CanvasShell className={className} fallbackClassName={fallbackClassName}>
      <HeroScene />
    </CanvasShell>
  );
}
