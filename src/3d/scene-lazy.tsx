"use client";

import dynamic from "next/dynamic";

import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

const fallback = <WebGLFallback className="min-h-[320px]" />;

export const HeroSceneLazy = dynamic(
  () => import("@/3d/scenes/hero-scene").then((module) => ({ default: module.HeroScene })),
  { ssr: false, loading: () => fallback }
);

export const BackgroundSceneLazy = dynamic(
  () =>
    import("@/3d/scenes/background-scene").then((module) => ({
      default: module.BackgroundScene,
    })),
  { ssr: false, loading: () => fallback }
);
