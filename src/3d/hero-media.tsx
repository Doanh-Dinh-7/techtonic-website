"use client";

import dynamic from "next/dynamic";

import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

/** Home hero 3D — single dynamic boundary (canvas + scene), SSR off. */
export const HeroCanvasWithScene = dynamic(
  () =>
    import("@/3d/hero-canvas-with-scene").then((module) => ({
      default: module.HeroCanvasWithScene,
    })),
  { ssr: false, loading: () => <WebGLFallback className="min-h-full" /> }
);
