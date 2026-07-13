"use client";

import dynamic from "next/dynamic";

import { CanvasShell } from "@/3d/canvas/canvas-shell";
import { WebGLFallback } from "@/3d/canvas/webgl-fallback";

const RecruitmentPageSceneLazy = dynamic(
  () =>
    import("@/3d/scenes/recruitment-page-scene").then((module) => ({
      default: module.RecruitmentPageScene,
    })),
  { ssr: false }
);

type RecruitmentPageCanvasProps = {
  className?: string;
};

export function RecruitmentPageCanvas({ className }: RecruitmentPageCanvasProps) {
  return (
    <CanvasShell
      className={className}
      fallback={<WebGLFallback className="absolute inset-0 min-h-0" />}
      fallbackClassName="absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
    >
      <RecruitmentPageSceneLazy />
    </CanvasShell>
  );
}
