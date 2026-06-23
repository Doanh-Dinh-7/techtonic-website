"use client";

import dynamic from "next/dynamic";

import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

/** Hero Rubik's cube 3D — single dynamic boundary, SSR off. */
export const HeroRubiksCube = dynamic(
  () =>
    import("@/3d/models/rubiks-cube/rubiks-cube-controller").then((module) => ({
      default: module.RubiksCubeController,
    })),
  { ssr: false, loading: () => <WebGLFallback className="min-h-full" /> }
);
