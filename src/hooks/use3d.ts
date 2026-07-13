"use client";

import { useEffect, useMemo, useState } from "react";

function canCreateWebGLContext() {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
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

/**
 * Centralized runtime capability checks for 3D rendering paths.
 */
export function use3d() {
  const reducedMotion = useReducedMotionPreference();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setSupportsWebGL(canCreateWebGLContext());
  }, []);

  useEffect(() => {
    if (hasInteracted) return;

    const enableMotion = () => setHasInteracted(true);

    window.addEventListener("pointermove", enableMotion, { once: true });
    window.addEventListener("touchstart", enableMotion, { once: true });
    window.addEventListener("keydown", enableMotion, { once: true });

    return () => {
      window.removeEventListener("pointermove", enableMotion);
      window.removeEventListener("touchstart", enableMotion);
      window.removeEventListener("keydown", enableMotion);
    };
  }, [hasInteracted]);

  return useMemo(
    () => ({
      reducedMotion,
      supportsWebGL,
      isReady: supportsWebGL !== null,
      shouldRenderMotion: supportsWebGL === true && !reducedMotion && hasInteracted,
    }),
    [hasInteracted, reducedMotion, supportsWebGL]
  );
}
