"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const HERO_IMAGES = [
  "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206566/mentor_mentee_ss1_wv08vr.webp",
  "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206566/tech_x_plore_cot6ms.webp",
  "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206584/cslt_1_ygk3oa.webp",
  "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206567/techware_ss1_ljlofj.webp",
  "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206585/nckh_s1_lfu4nn.webp",
  "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206579/mentor_mentee_ss2_th0fyt.webp",
] as const;

/**
 * Encapsulates Hero section UI state and scroll/motion behavior.
 */
export function useHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const heroY = useTransform(scrollY, [0, viewportHeight], [0, 150]);
  const heroScale = useTransform(scrollY, [0, viewportHeight], [1, 1.1]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNext = useCallback(() => {
    const nextSection = document.getElementById("core-values");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return useMemo(
    () => ({
      currentHeroImage,
      heroImages: HERO_IMAGES,
      heroRef,
      heroScale,
      heroY,
      isLoaded,
      scrollToNext,
    }),
    [currentHeroImage, heroScale, heroY, isLoaded, scrollToNext]
  );
}
