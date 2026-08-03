"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLenisReady } from "@/widgets/layout/lenis-provider";

const READY_TIMEOUT_MS = 2500;

const AnimationReadyContext = React.createContext(false);

export function useAnimationReady() {
  return React.useContext(AnimationReadyContext);
}

/**
 * Hides the site behind an overlay until fonts + Lenis are ready,
 * then remounts children so Framer Motion intros run on reveal.
 */
export function AnimationReadyProvider({ children }: { children: React.ReactNode }) {
  const isLenisReady = useLenisReady();
  const [fontsReady, setFontsReady] = React.useState(false);
  const [timedOut, setTimedOut] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof document === "undefined" || !document.fonts?.ready) {
      setFontsReady(true);
      return;
    }

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    const id = window.setTimeout(() => setTimedOut(true), READY_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, []);

  React.useEffect(() => {
    if (isReady) return;
    if (!(fontsReady && isLenisReady) && !timedOut) return;

    const frameId = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [fontsReady, isLenisReady, timedOut, isReady]);

  React.useEffect(() => {
    if (isReady) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isReady]);

  return (
    <AnimationReadyContext.Provider value={isReady}>
      <div key={isReady ? "app-ready" : "app-pending"}>{children}</div>
      <AnimatePresence>
        {!isReady ? (
          <motion.div
            key="page-animation-gate"
            className="fixed inset-0 z-[9999] bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>
    </AnimationReadyContext.Provider>
  );
}
