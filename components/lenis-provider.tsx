"use client";

import * as React from "react";
import Lenis from "lenis";
import { useReducedMotionPreference } from "@/hooks/use3d";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotionPreference();

  React.useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
