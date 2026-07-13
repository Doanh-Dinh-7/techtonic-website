"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { SectionShell } from "@/shared/ui-v2";

const VIDEO_BASE_SRC = "https://www.youtube.com/embed/fko6tQUqNhQ?rel=0";
const VIDEO_IDLE_SRC = `${VIDEO_BASE_SRC}&autoplay=0`;
const VIDEO_AUTOPLAY_SRC = `${VIDEO_BASE_SRC}&autoplay=1&mute=1`;

export function AboutVideo() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || shouldAutoplay || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldAutoplay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldAutoplay]);

  return (
    <SectionShell
      id="about-video"
      tone="dark"
      align="center"
      className="border-t border-border bg-secondary/40 py-16 dark:border-white/10 dark:bg-white/[0.02] lg:py-24"
      contentClassName="max-w-5xl"
      badge="Video giới thiệu"
      title="Nhìn lại cùng TechTonic"
      description="Cùng nhìn lại tinh thần, hành trình và những giá trị mà TechTonic Club đang xây dựng."
    >
      <motion.div
        ref={videoRef}
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-cyan-700/10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-neon-cyan/10">
          <iframe
            className="h-full w-full"
            src={shouldAutoplay ? VIDEO_AUTOPLAY_SRC : VIDEO_IDLE_SRC}
            title="Video giới thiệu giá trị TechTonic Club"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.div>
    </SectionShell>
  );
}
