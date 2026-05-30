"use client";

import dynamic from "next/dynamic";

import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

/** R3F canvas — client-only to avoid SSR/prerender issues (Next 15+). */
export const HeroCanvasShell = dynamic(
  () => import("@/3d/canvas/canvas-shell").then((module) => ({ default: module.CanvasShell })),
  { ssr: false, loading: () => <WebGLFallback className="min-h-full" /> }
);

export { HeroSceneLazy } from "@/3d/scene-lazy";
