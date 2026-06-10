"use client";

import { useEffect, useRef } from "react";

/**
 * Shift + mouse wheel scrolls horizontally inside `ref`.
 * While Shift is held over the container, vertical page scroll is blocked.
 */
export function useShiftWheelHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      if (!event.shiftKey) return;

      // Block Lenis / browser vertical scroll whenever Shift+wheel over this region.
      event.preventDefault();
      event.stopPropagation();

      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      if (maxScrollLeft <= 0) return;

      const delta = event.deltaX !== 0 ? event.deltaX : event.deltaY;
      if (delta === 0) return;

      element.scrollLeft = Math.min(maxScrollLeft, Math.max(0, element.scrollLeft + delta));
    };

    element.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    return () => element.removeEventListener("wheel", handleWheel, { capture: true });
  }, []);

  return ref;
}
