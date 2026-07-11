"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Heart, Lightbulb, Network, Rocket, Eye } from "lucide-react";
import { useState } from "react";

import {
  AboutIdentityNav,
  type AboutIdentityPanelId,
} from "@/features/about/components/about-identity-nav";
import { CoreValuesList } from "@/features/about/components/core-values-list";
import {
  aboutCoreValues,
  aboutMissionCopy,
  aboutMissionPillars,
  aboutVisionCopy,
} from "@/lib/content/about";
import { GlassCard, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const identityPanels = [
  { id: "vision" as const, label: aboutVisionCopy.title },
  { id: "mission" as const, label: aboutMissionCopy.sectionTitle },
  { id: "values" as const, label: "Giá trị cốt lõi" },
];

const pillarIcons = {
  school: GraduationCap,
  hub: Network,
  rocket: Rocket,
  lightbulb: Lightbulb,
  heart: Heart,
} as const;

function VisionPanel() {
  return (
    <GlassCard glow="cyan" className="p-8 md:p-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neon-cyan/10">
          <Eye className="h-6 w-6 text-neon-cyan" aria-hidden />
        </div>
        <h3 className="font-utm-akashi text-xl font-normal text-foreground md:text-2xl dark:text-white">
          {aboutVisionCopy.title}
        </h3>
      </div>
      <p className="text-lg leading-relaxed text-muted-foreground dark:text-white/80">
        {aboutVisionCopy.description}
      </p>
    </GlassCard>
  );
}

function MissionPanel() {
  return (
    <div className="space-y-10">
      <div className="relative">
        <span
          className="absolute -left-2 -top-4 font-serif text-5xl text-neon-cyan/20 md:-left-4"
          aria-hidden
        >
          &ldquo;
        </span>
        <p className="font-paris2024 text-xl italic leading-relaxed text-foreground md:text-2xl lg:text-3xl dark:text-white">
          {aboutMissionCopy.quote}
        </p>
        <span
          className="absolute -bottom-4 -right-2 font-serif text-5xl text-neon-cyan/20 md:-right-4"
          aria-hidden
        >
          &rdquo;
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {aboutMissionPillars.map((pillar) => {
          const Icon = pillarIcons[pillar.icon];
          const isCyan = pillar.accent === "cyan";
          return (
            <GlassCard
              key={pillar.id}
              glow={isCyan ? "cyan" : "purple"}
              className="group flex flex-col items-center bg-card/90 p-6 text-center dark:bg-white/[0.06]"
            >
              <div
                className={cn(
                  "mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110",
                  isCyan ? "bg-neon-cyan/10" : "bg-neon-purple/10"
                )}
              >
                <Icon
                  className={cn("h-7 w-7", isCyan ? "text-neon-cyan" : "text-neon-purple")}
                  aria-hidden
                />
              </div>
              <h4 className="font-utm-akashi text-sm font-normal text-foreground md:text-base dark:text-white">
                {pillar.label}
              </h4>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

function ValuesPanel() {
  return <CoreValuesList values={aboutCoreValues} />;
}

export function AboutIdentitySection() {
  const [activePanel, setActivePanel] = useState<AboutIdentityPanelId>("vision");

  return (
    <SectionShell
      id="about-identity"
      tone="dark"
      align="left"
      className="border-t border-border bg-transparent py-16 lg:py-24 dark:border-white/10 dark:bg-white/[0.02]"
      contentClassName="max-w-7xl"
      badge="Định hướng CLB"
      title="Tầm nhìn & Sứ mệnh"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-12">
        <AboutIdentityNav activeId={activePanel} onSelect={setActivePanel} items={identityPanels} />

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              id={
                activePanel === "vision"
                  ? "about-vision"
                  : activePanel === "mission"
                    ? "about-mission"
                    : "about-core-values"
              }
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              {activePanel === "vision" && <VisionPanel />}
              {activePanel === "mission" && <MissionPanel />}
              {activePanel === "values" && <ValuesPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}
