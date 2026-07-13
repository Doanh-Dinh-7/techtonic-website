"use client";

import { useEffect } from "react";

/**
 * Handles deep-link hash scrolling without making the whole page widget client-side.
 */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contact") {
      requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  return null;
}
