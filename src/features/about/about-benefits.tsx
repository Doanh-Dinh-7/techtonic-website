"use client";

import { motion } from "framer-motion";
import { BookOpen, UserRound, Users } from "lucide-react";

import { aboutBenefits } from "@/lib/content/about";
import { GlassCard, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const benefitIcons = {
  groups: Users,
  book: BookOpen,
  diversity: UserRound,
} as const;

export function AboutBenefits() {
  return (
    <SectionShell
      id="about-benefits"
      tone="dark"
      align="center"
      className="bg-transparent py-16 lg:py-24"
      contentClassName="max-w-7xl"
      title="CLB mang lại gì?"
    >
      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {aboutBenefits.map((benefit) => {
          const Icon = benefitIcons[benefit.icon];
          const isCyan = benefit.accent === "cyan";
          return (
            <GlassCard
              key={benefit.id}
              glow={isCyan ? "cyan" : "purple"}
              className={cn(
                "p-10 transition-colors",
                isCyan ? "hover:bg-neon-cyan/5" : "hover:bg-neon-purple/5"
              )}
            >
              <Icon
                className={cn("mb-6 h-12 w-12", isCyan ? "text-neon-cyan" : "text-neon-purple")}
                aria-hidden
              />
              <h3 className="mb-4 font-utm-akashi text-xl font-normal text-foreground md:text-2xl dark:text-white">
                {benefit.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground dark:text-white/68">
                {benefit.description}
              </p>
            </GlassCard>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
