"use client";

import { useEffect, useMemo, useState } from "react";

function canCreateWebGLContext() {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

export function use3d() {
  const reducedMotion = useReducedMotionPreference();
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setSupportsWebGL(canCreateWebGLContext());
  }, []);

  return useMemo(
    () => ({
      reducedMotion,
      supportsWebGL,
      isReady: supportsWebGL !== null,
      shouldRenderMotion: supportsWebGL === true && !reducedMotion,
    }),
    [reducedMotion, supportsWebGL],
  );
}
