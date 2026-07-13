"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { eventsHeroCopy } from "@/lib/content/events";
import { use3d } from "@/hooks/use3d";
import { GradientOrb, NeonButton } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const EventsHeroCanvas = dynamic(
  () => import("@/3d/events-hero-canvas").then((m) => ({ default: m.EventsHeroCanvas })),
  { ssr: false }
);

export function EventsHero() {
  const { shouldRenderMotion } = use3d();

  return (
    <section className="relative flex min-h-[min(819px,90vh)] items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-40" aria-hidden>
        {shouldRenderMotion ? (
          <EventsHeroCanvas className="absolute inset-0 h-full w-full" />
        ) : (
          <>
            <GradientOrb color="cyan" className="left-[10%] top-[15%] h-64 w-64" />
            <GradientOrb color="purple" className="right-[5%] top-[20%] h-80 w-80" />
          </>
        )}
      </div>
      <motion.div
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className={cn(
            "inline-block rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2",
            "font-utm-akashi text-sm uppercase tracking-widest text-cyan-800",
            "dark:border-neon-cyan/10 dark:bg-neon-cyan/10 dark:text-neon-cyan"
          )}
        >
          {eventsHeroCopy.badge}
        </span>
        <h1 className="font-paris2024 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:text-white">
          TechTonic{" "}
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            {eventsHeroCopy.title}
          </span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground dark:text-white/68">
          {eventsHeroCopy.description}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <NeonButton
            variant="cyan"
            type="button"
            onClick={() => scrollToSection("weekly-academic")}
          >
            {eventsHeroCopy.ctaSchedule}
          </NeonButton>
          <NeonButton
            variant="ghost"
            type="button"
            onClick={() => scrollToSection("event-timeline")}
          >
            {eventsHeroCopy.ctaTimeline}
          </NeonButton>
        </div>
      </motion.div>
    </section>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
