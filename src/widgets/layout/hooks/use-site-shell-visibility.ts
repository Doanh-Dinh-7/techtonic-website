"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type UseSiteShellVisibilityResult = {
  showBackToTop: boolean;
  showHeader: boolean;
  scrollToTop: () => void;
};

/**
 * Manages header/back-to-top visibility behavior for home and inner pages.
 */
export function useSiteShellVisibility(isHome: boolean): UseSiteShellVisibilityResult {
  const [showHeader, setShowHeader] = useState(!isHome);
  const [showBackToTop, setShowBackToTop] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setShowHeader(true);
      setShowBackToTop(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight;
      setShowHeader(scrolled);
      setShowBackToTop(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return useMemo(
    () => ({
      showBackToTop,
      showHeader,
      scrollToTop,
    }),
    [showBackToTop, showHeader, scrollToTop]
  );
}
