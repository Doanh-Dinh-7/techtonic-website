"use client";

import dynamic from "next/dynamic";

import { CanvasShell } from "@/3d/canvas/canvas-shell";
import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

const EventsHeroSceneLazy = dynamic(
  () =>
    import("@/3d/scenes/events-hero-scene").then((module) => ({
      default: module.EventsHeroScene,
    })),
  { ssr: false }
);

type EventsHeroCanvasProps = {
  className?: string;
};

export function EventsHeroCanvas({ className }: EventsHeroCanvasProps) {
  return (
    <CanvasShell
      className={className}
      fallback={<WebGLFallback className="absolute inset-0 min-h-0" />}
      fallbackClassName="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
    >
      <EventsHeroSceneLazy />
    </CanvasShell>
  );
}
