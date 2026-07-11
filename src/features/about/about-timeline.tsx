"use client";

import { motion } from "framer-motion";

import { TimelineMilestoneCard } from "@/features/about/components/timeline-milestone-card";
import { clubTimeline, clubTimelineFooter } from "@/lib/content/timeline";
import { useShiftWheelHorizontalScroll } from "@/shared/hooks/use-shift-wheel-horizontal-scroll";
import { cn } from "@/shared/utils";

export function AboutTimeline() {
  const scrollRef = useShiftWheelHorizontalScroll<HTMLDivElement>();

  return (
    <section
      id="about-timeline"
      className="overflow-hidden border-t border-border py-16 dark:border-white/10 lg:py-24"
    >
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-paris2024 text-3xl font-bold tracking-tight text-foreground sm:text-5xl dark:text-white">
          Hành trình phát triển
        </h2>
      </div>

      <motion.div
        ref={scrollRef}
        className="about-timeline-scroll w-full overflow-x-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        aria-label="Timeline hành trình phát triển TechTonic Club"
      >
        <div className={cn("relative w-max min-w-full pb-8 pt-12")}>
          <div className="about-timeline-track absolute bottom-8 left-0 right-0 h-1.5 rounded-full" />
          <div className="relative z-10 flex min-w-full items-end justify-between gap-6 px-6 md:gap-8 md:px-10 lg:px-12">
            {clubTimeline.map((entry) => (
              <TimelineMilestoneCard key={entry.dateLabel + entry.title} entry={entry} />
            ))}
          </div>
          <p className="absolute bottom-8 right-6 z-20 rounded bg-[#0a0a0a]/80 px-2 py-1 text-sm italic text-white/60 backdrop-blur-sm md:right-10 lg:right-12">
            {clubTimelineFooter}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
