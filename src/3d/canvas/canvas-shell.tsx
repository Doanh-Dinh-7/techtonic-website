"use client";

import * as React from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { cn } from "@/shared/utils";
import { CAMERA_DEFAULTS } from "@/lib/3d/constants";
import { R3F_PERFORMANCE } from "@/lib/3d/performance";
import { use3d } from "@/hooks/use3d";
import { WebGLFallback } from "./webgl-fallback";

type CanvasShellProps = Omit<CanvasProps, "children"> & {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  fallbackClassName?: string;
};

export function CanvasShell({
  children,
  className,
  fallback,
  fallbackClassName,
  camera,
  dpr,
  frameloop,
  gl,
  ...props
}: CanvasShellProps) {
  const { isReady, reducedMotion, supportsWebGL } = use3d();

  if (!isReady || supportsWebGL === false) {
    return <>{fallback ?? <WebGLFallback className={fallbackClassName} />}</>;
  }

  return (
    <div aria-hidden="true" className={cn("relative h-full w-full", className)}>
      <Canvas
        camera={camera ?? CAMERA_DEFAULTS}
        dpr={dpr ?? R3F_PERFORMANCE.dpr}
        frameloop={
          frameloop ??
          (reducedMotion ? R3F_PERFORMANCE.reducedMotionFrameloop : R3F_PERFORMANCE.frameloop)
        }
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          ...gl,
        }}
        {...props}
      >
        <React.Suspense fallback={null}>{children}</React.Suspense>
      </Canvas>
    </div>
  );
}
