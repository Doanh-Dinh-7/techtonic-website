"use client";

import { motion } from "framer-motion";
import { Briefcase, Lightbulb, Rocket, Sparkles } from "lucide-react";

import { aboutFitQuestions } from "@/lib/content/about";
import { GlassCard, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const fitIcons = {
  lightbulb: Lightbulb,
  rocket: Rocket,
  "self-improvement": Sparkles,
  work: Briefcase,
} as const;

export function AboutFit() {
  return (
    <SectionShell
      id="about-fit"
      tone="dark"
      align="center"
      className="border-t border-white/10 bg-white/[0.02] py-16 lg:py-24"
      contentClassName="max-w-7xl"
      title="Bạn có phù hợp?"
    >
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {aboutFitQuestions.map((item) => {
          const Icon = fitIcons[item.icon];
          const isCyan = item.accent === "cyan";
          return (
            <GlassCard
              key={item.id}
              glow={isCyan ? "cyan" : "purple"}
              className={cn(
                "p-8 transition-shadow",
                isCyan
                  ? "hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                  : "hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              )}
            >
              <div
                className={cn(
                  "mb-6 flex h-12 w-12 items-center justify-center rounded-lg",
                  isCyan ? "bg-neon-cyan/20" : "bg-neon-purple/20"
                )}
              >
                <Icon
                  className={cn("h-6 w-6", isCyan ? "text-neon-cyan" : "text-neon-purple")}
                  aria-hidden
                />
              </div>
              <h4 className="mb-3 font-utm-akashi text-base font-normal leading-snug text-white md:text-lg">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-white/60">{item.description}</p>
            </GlassCard>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
