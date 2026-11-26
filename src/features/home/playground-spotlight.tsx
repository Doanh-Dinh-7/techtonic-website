"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Gamepad2, Hand, Scan, Trophy } from "lucide-react";
import Link from "next/link";

import { liveGesturePuzzle } from "@/lib/content/playground";
import { Card3D, GlassCard, GradientOrb, NeonButton, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const SPOTLIGHT_GRID = [
  { label: "04", swapped: false },
  { label: "01", swapped: false },
  { label: "07", swapped: false },
  { label: "03", swapped: false },
  { label: "05", swapped: true },
  { label: "09", swapped: false },
  { label: "08", swapped: false },
  { label: "02", swapped: true },
  { label: "06", swapped: false },
] as const;

export function PlaygroundSpotlight() {
  return (
    <SectionShell
      id="playground"
      tone="dark"
      className="border-t border-border py-16 dark:border-white/10 lg:py-24"
      contentClassName="max-w-7xl"
    >
      <GradientOrb className="-left-24 top-10 h-80 w-80" color="cyan" />
      <GradientOrb className="-right-20 bottom-6 h-80 w-80" color="purple" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <GlassCard glow="cyan" className="overflow-hidden border-cyan-500/30 p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6 text-left">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-cyan-600/25 bg-cyan-600/10 px-4 py-1.5",
                  "font-utm-akashi text-xs uppercase tracking-[0.22em] text-cyan-800 dark:border-cyan-300/25 dark:bg-cyan-300/10 dark:text-cyan-100"
                )}
              >
                <Gamepad2 className="h-3.5 w-3.5" aria-hidden />
                {liveGesturePuzzle.spotlightBadge}
              </span>

              <h2 className="font-paris2024 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl dark:text-white">
                {liveGesturePuzzle.spotlightTitle}
              </h2>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base dark:text-white/72">
                {liveGesturePuzzle.spotlightDescription}
              </p>

              <ul className="flex flex-wrap gap-2.5">
                {liveGesturePuzzle.features.map((feature) => (
                  <li
                    key={feature.id}
                    className="rounded-full border border-border bg-secondary/70 px-3.5 py-1.5 text-xs font-medium text-foreground dark:border-white/15 dark:bg-white/[0.06] dark:text-white/85"
                  >
                    {feature.label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <NeonButton asChild variant="cyan" className="min-h-11">
                  <Link href="/playground">
                    Chơi ngay trên web
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </NeonButton>

                <NeonButton asChild variant="ghost" className="min-h-11">
                  <a href={liveGesturePuzzle.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Mở tab mới
                  </a>
                </NeonButton>
              </div>
            </div>

            <Card3D intensity={7} className="w-full">
              <div
                aria-hidden
                className="relative overflow-hidden rounded-2xl border border-cyan-400/35 bg-gradient-to-br from-slate-950 via-[#0d2247] to-[#0a1326] p-5 text-white shadow-[0_0_40px_rgba(0,212,255,0.18)]"
              >
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                  <span className="inline-flex items-center gap-2 text-cyan-200">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    AI GESTURE PUZZLE
                  </span>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] text-cyan-200">
                    3×3 LIVE
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {SPOTLIGHT_GRID.map((tile) => (
                    <div
                      key={tile.label}
                      className={cn(
                        "flex aspect-square items-center justify-center rounded-xl border font-mono text-base font-bold transition-colors",
                        tile.swapped
                          ? "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_20px_rgba(0,245,255,0.28)]"
                          : "border-white/15 bg-white/[0.06] text-blue-100/85"
                      )}
                    >
                      {tile.label}
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-[11px] text-blue-100/80">
                  <div className="flex items-center gap-1.5">
                    <Scan className="h-3.5 w-3.5 text-cyan-300" />
                    <span>Chụp 2 tay</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <Hand className="h-3.5 w-3.5 text-purple-300" />
                    <span>Chụm ghép</span>
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-fuchsia-300" />
                    <span>Đua top</span>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </GlassCard>
      </motion.div>
    </SectionShell>
  );
}
