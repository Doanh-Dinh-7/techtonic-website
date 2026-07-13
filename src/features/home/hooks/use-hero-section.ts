"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Encapsulates Hero section UI state and scroll/motion behavior.
 */
export function useHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldMountRubik, setShouldMountRubik] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const heroY = useTransform(scrollY, [0, viewportHeight], [0, 150]);
  const heroScale = useTransform(scrollY, [0, viewportHeight], [1, 1.1]);

  useEffect(() => {
    setIsLoaded(true);

    const mountRubik = () => {
      setShouldMountRubik(true);
    };

    window.addEventListener("pointermove", mountRubik, { once: true });
    window.addEventListener("touchstart", mountRubik, { once: true });
    window.addEventListener("keydown", mountRubik, { once: true });

    return () => {
      window.removeEventListener("pointermove", mountRubik);
      window.removeEventListener("touchstart", mountRubik);
      window.removeEventListener("keydown", mountRubik);
    };
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("core-values");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return useMemo(
    () => ({
      heroRef,
      heroScale,
      heroY,
      isLoaded,
      shouldMountRubik,
      scrollToNext,
    }),
    [heroScale, heroY, isLoaded, shouldMountRubik, scrollToNext]
  );
}
