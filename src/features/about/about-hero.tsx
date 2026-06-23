"use client";

import { motion } from "framer-motion";

import { AboutHeroParticles } from "@/features/about/components/about-hero-particles";
import { AboutHeroShapes } from "@/features/about/components/about-hero-shapes";
import { aboutHeroCopy } from "@/lib/content/about";
import { cn } from "@/shared/utils";

export function AboutHero() {
  return (
    <section
      id="about-hero"
      className={cn(
        "about-hero-mesh relative flex min-h-[min(60vh,640px)] flex-col items-center justify-center",
        "overflow-hidden border-b border-white/10 px-4 pb-16 pt-28 text-center sm:px-6 lg:px-8"
      )}
    >
      <AboutHeroParticles className="absolute inset-0 z-0 opacity-60" />
      <AboutHeroShapes />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10 v2-grid-bg"
        style={{ backgroundSize: "60px 60px" }}
        aria-hidden
      />
      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className={cn(
            "about-hero-glow-pulse font-paris2024 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl",
            "bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent"
          )}
        >
          {aboutHeroCopy.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/68">{aboutHeroCopy.tagline}</p>
      </motion.div>
    </section>
  );
}
