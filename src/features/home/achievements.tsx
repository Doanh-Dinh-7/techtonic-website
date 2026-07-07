"use client";

import { motion } from "framer-motion";
import { Calendar, Code, Trophy, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";

import { clubAchievementStats } from "@/lib/content/home";
import { partnerLogos } from "@/lib/content/partners";
import { Counter } from "@/shared/ui/counter";
import { Card3D, GlassCard, GradientOrb, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const iconMap: Record<(typeof clubAchievementStats)[number]["icon"], LucideIcon> = {
  trophy: Trophy,
  users: Users,
  code: Code,
  calendar: Calendar,
};

const statAccentClasses = {
  yellow: {
    icon: "border-amber-400/45 bg-amber-400/15 text-amber-300",
    value: "text-amber-300",
    card: "shadow-[0_0_36px_rgba(251,191,36,0.16)] hover:shadow-[0_0_48px_rgba(251,191,36,0.24)]",
    glassGlow: "none" as const,
  },
  blue: {
    icon: "border-blue-400/45 bg-blue-400/15 text-blue-300",
    value: "text-blue-300",
    card: "shadow-[0_0_36px_rgba(59,130,246,0.16)] hover:shadow-[0_0_48px_rgba(59,130,246,0.24)]",
    glassGlow: "none" as const,
  },
  green: {
    icon: "border-emerald-400/45 bg-emerald-400/15 text-emerald-300",
    value: "text-emerald-300",
    card: "shadow-[0_0_36px_rgba(52,211,153,0.16)] hover:shadow-[0_0_48px_rgba(52,211,153,0.24)]",
    glassGlow: "none" as const,
  },
  purple: {
    icon: "border-neon-purple/40 bg-neon-purple/15 text-neon-purple",
    value: "text-neon-purple",
    card: "",
    glassGlow: "purple" as const,
  },
} as const;

export function Achievements() {
  return (
    <SectionShell
      id="achievements"
      tone="dark"
      align="center"
      className="border-t border-white/10 py-16 lg:py-24"
      contentClassName="max-w-7xl"
    >
      <GradientOrb className="-left-24 top-0" color="cyan" />
      <GradientOrb className="-right-16 bottom-1/4" color="purple" />

      <motion.div
        className="mb-12 space-y-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-4 py-2",
            "font-utm-akashi text-sm uppercase tracking-widest text-neon-cyan"
          )}
        >
          <Trophy className="h-3.5 w-3.5" aria-hidden />
          Thành tích
        </span>
        <h2 className="font-paris2024 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Dấu ấn & Thành tựu
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-white/68 sm:text-base">
          Những thành tích đáng tự hào của TechTonic Club qua các năm hoạt động
        </p>
      </motion.div>

      <div className="mb-14 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {clubAchievementStats.map((stat, index) => {
          const Icon = iconMap[stat.icon];
          const accent = statAccentClasses[stat.accent];

          return (
            <motion.div
              key={stat.id}
              className="flex h-full min-h-0 flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card3D intensity={8} className="h-full">
                <GlassCard
                  glow={accent.glassGlow}
                  className={cn("flex h-full flex-col items-center p-6 text-center", accent.card)}
                >
                  <div
                    className={cn(
                      "mb-4 flex h-14 w-14 items-center justify-center rounded-full border",
                      accent.icon
                    )}
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <div className={cn("font-paris2024 text-3xl font-bold", accent.value)}>
                    <Counter end={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="mt-2 text-sm text-white/68">{stat.label}</p>
                </GlassCard>
              </Card3D>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-center font-utm-akashi text-lg text-white">Đối tác & Hợp tác</h3>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:gap-6">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={partner.alt}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card3D intensity={6} className="h-full">
                <GlassCard glow="none" className="h-full border-white/15 p-3 sm:p-4">
                  <div className="flex h-28 items-center justify-center rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <Image
                      src={partner.src}
                      alt={partner.alt}
                      width={0}
                      height={48}
                      sizes="(max-width: 768px) 50vw, 320px"
                      className="h-11 w-auto max-w-full object-contain sm:h-12"
                    />
                  </div>
                </GlassCard>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}
