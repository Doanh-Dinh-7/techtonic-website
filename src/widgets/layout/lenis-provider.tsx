"use client";

import * as React from "react";
import Lenis from "lenis";
import { useReducedMotionPreference } from "@/hooks/use3d";

const LenisReadyContext = React.createContext(false);

export function useLenisReady() {
  return React.useContext(LenisReadyContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotionPreference();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (reducedMotion) {
      setIsReady(true);
      return;
    }

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
    setIsReady(true);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      setIsReady(false);
    };
  }, [reducedMotion]);

  return <LenisReadyContext.Provider value={isReady}>{children}</LenisReadyContext.Provider>;
}
