"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";

const VIDEO_BASE_SRC = "https://www.youtube.com/embed/0qoiC8_fi8k?rel=0";
const VIDEO_IDLE_SRC = `${VIDEO_BASE_SRC}&autoplay=0`;
const VIDEO_AUTOPLAY_SRC = `${VIDEO_BASE_SRC}&autoplay=1&mute=1`;

export function Video() {
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
    <section id="video" className="bg-secondary/45 py-20 text-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-red-100 text-red-700 hover:bg-red-700 hover:text-red-100">
            Video giới thiệu
          </Badge>
          <h2 className="font-paris2024 text-3xl font-bold text-foreground lg:text-5xl">
            Khám phá TechTonic Club
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Xem video để hiểu rõ hơn về hoạt động và tinh thần của câu lạc bộ
          </p>
        </motion.div>

        <motion.div
          ref={videoRef}
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-card shadow-2xl shadow-primary/10">
            <iframe
              className="w-full h-full"
              src={shouldAutoplay ? VIDEO_AUTOPLAY_SRC : VIDEO_IDLE_SRC}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
