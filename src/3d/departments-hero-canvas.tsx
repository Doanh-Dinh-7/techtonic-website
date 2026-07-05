"use client";

import dynamic from "next/dynamic";

import { CanvasShell } from "@/3d/canvas/canvas-shell";
import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

const DepartmentsHeroSceneLazy = dynamic(
  () =>
    import("@/3d/scenes/departments-hero-scene").then((module) => ({
      default: module.DepartmentsHeroScene,
    })),
  { ssr: false }
);

type DepartmentsHeroCanvasProps = {
  className?: string;
};

export function DepartmentsHeroCanvas({ className }: DepartmentsHeroCanvasProps) {
  return (
    <CanvasShell
      className={className}
      fallback={<WebGLFallback className="absolute inset-0 min-h-0" />}
      fallbackClassName="absolute inset-0"
      camera={{ position: [0, 0, 6.5], fov: 48, near: 0.1, far: 100 }}
    >
      <DepartmentsHeroSceneLazy />
    </CanvasShell>
  );
}
