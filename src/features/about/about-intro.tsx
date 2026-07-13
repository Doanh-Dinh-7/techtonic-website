"use client";

import { motion } from "framer-motion";

import { aboutIntroCopy, aboutPillars } from "@/lib/content/about";
import { GlassCard, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

export function AboutIntro() {
  return (
    <SectionShell
      id="about-intro"
      tone="dark"
      align="left"
      className="bg-transparent py-16 lg:py-24"
      contentClassName="max-w-7xl"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 font-paris2024 text-3xl font-bold text-foreground sm:text-4xl dark:text-white">
            {aboutIntroCopy.title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground dark:text-white/68">
            {aboutIntroCopy.description}
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {aboutPillars.map((pillar) => (
            <GlassCard
              key={pillar.id}
              glow={pillar.accent === "cyan" ? "cyan" : "purple"}
              className="flex flex-col items-center justify-center bg-card/90 p-6 text-center shadow-sm dark:bg-white/[0.06]"
            >
              <p
                className={cn(
                  "font-mono text-xs uppercase tracking-wider",
                  pillar.accent === "cyan"
                    ? "text-cyan-700 dark:text-neon-cyan"
                    : "text-purple-700 dark:text-neon-purple"
                )}
              >
                {pillar.label}
              </p>
              <div
                className={cn(
                  "mx-auto mt-2 h-1 w-8",
                  pillar.accent === "cyan" ? "bg-neon-cyan/30" : "bg-neon-purple/30"
                )}
              />
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
