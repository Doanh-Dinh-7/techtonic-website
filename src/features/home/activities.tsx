"use client";

import { motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { Layers3, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { use3d } from "@/hooks/use3d";
import {
  homeActivities,
  homeActivitiesSectionCopy,
  type HomeActivity,
  type HomeActivityAccent,
} from "@/lib/content/home-activities";
import { Card3D, GlassCard, GradientOrb, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

type ActivityCardPlacement = {
  x: number;
  y: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  zIndex: number;
};

const cardPlacements: ActivityCardPlacement[] = [
  { x: -56, y: 0, rotate: -4.5, rotateX: 5, rotateY: -7, scale: 0.94, zIndex: 10 },
  { x: 112, y: 96, rotate: 3.5, rotateX: 4, rotateY: 5, scale: 0.955, zIndex: 20 },
  { x: -72, y: 192, rotate: -2.8, rotateX: 2, rotateY: -4, scale: 0.97, zIndex: 30 },
  { x: 96, y: 288, rotate: 2.2, rotateX: 1, rotateY: 3, scale: 0.985, zIndex: 40 },
  { x: -40, y: 384, rotate: -1.4, rotateX: 0, rotateY: -1, scale: 1, zIndex: 50 },
];

const accentClasses: Record<
  HomeActivityAccent,
  {
    border: string;
    glow: "cyan" | "purple" | "magenta";
    text: string;
    badge: string;
    wash: string;
  }
> = {
  cyan: {
    border: "border-cyan-500/30 dark:border-cyan-300/40",
    glow: "cyan",
    text: "text-cyan-700 dark:text-cyan-100",
    badge:
      "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:border-cyan-300/35 dark:bg-cyan-300/12 dark:text-cyan-100",
    wash: "from-cyan-300/16 via-transparent to-blue-500/10",
  },
  purple: {
    border: "border-purple-500/30 dark:border-purple-300/40",
    glow: "purple",
    text: "text-purple-700 dark:text-purple-100",
    badge:
      "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:border-purple-300/35 dark:bg-purple-300/12 dark:text-purple-100",
    wash: "from-purple-400/16 via-transparent to-cyan-300/10",
  },
  magenta: {
    border: "border-fuchsia-500/30 dark:border-fuchsia-300/40",
    glow: "magenta",
    text: "text-fuchsia-700 dark:text-fuchsia-100",
    badge:
      "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:border-fuchsia-300/35 dark:bg-fuchsia-300/12 dark:text-fuchsia-100",
    wash: "from-fuchsia-400/16 via-transparent to-purple-500/10",
  },
  blue: {
    border: "border-blue-500/30 dark:border-blue-300/40",
    glow: "cyan",
    text: "text-blue-700 dark:text-blue-100",
    badge:
      "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-300/35 dark:bg-blue-300/12 dark:text-blue-100",
    wash: "from-blue-400/16 via-transparent to-cyan-300/10",
  },
  amber: {
    border: "border-amber-500/30 dark:border-amber-200/40",
    glow: "magenta",
    text: "text-amber-700 dark:text-amber-100",
    badge:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-200/35 dark:bg-amber-200/12 dark:text-amber-100",
    wash: "from-amber-200/16 via-transparent to-fuchsia-400/10",
  },
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

type ActivityStackCardProps = {
  activity: HomeActivity;
  index: number;
  isAnimated: boolean;
  progress: MotionValue<number>;
};

function ActivityStackCard({ activity, index, isAnimated, progress }: ActivityStackCardProps) {
  const placement = cardPlacements[index] ?? cardPlacements[cardPlacements.length - 1];
  const revealStart = index * 0.17;
  const revealEnd = Math.min(revealStart + 0.28, 0.96);
  const entryY = 520 + index * 88;
  const accent = accentClasses[activity.accent];

  const y = useTransform(
    progress,
    [revealStart, revealEnd, 1],
    [entryY, placement.y, placement.y],
    {
      clamp: true,
    }
  );
  const x = useTransform(progress, [revealStart, revealEnd, 1], [72, placement.x, placement.x], {
    clamp: true,
  });
  const opacity = useTransform(progress, [revealStart, revealStart + 0.1, 1], [0, 1, 1], {
    clamp: true,
  });
  const rotateZ = useTransform(
    progress,
    [revealStart, revealEnd, 1],
    [10, placement.rotate, placement.rotate],
    { clamp: true }
  );
  const rotateX = useTransform(
    progress,
    [revealStart, revealEnd, 1],
    [12, placement.rotateX, placement.rotateX],
    { clamp: true }
  );
  const rotateY = useTransform(
    progress,
    [revealStart, revealEnd, 1],
    [-14, placement.rotateY, placement.rotateY],
    { clamp: true }
  );
  const scale = useTransform(
    progress,
    [revealStart, revealEnd, 1],
    [0.86, placement.scale, placement.scale],
    { clamp: true }
  );

  const motionStyle: MotionStyle = isAnimated
    ? {
        opacity,
        rotateX,
        rotateY,
        rotateZ,
        scale,
        transformStyle: "preserve-3d",
        x,
        y,
        zIndex: placement.zIndex,
      }
    : {
        opacity: 1,
        transformStyle: "preserve-3d",
      };

  const card = (
    <motion.article
      aria-labelledby={`activity-${activity.id}-title`}
      className={cn(
        "w-full outline-none",
        isAnimated ? "absolute right-4 top-2 w-[min(720px,52vw)]" : "relative h-full"
      )}
      style={motionStyle}
      tabIndex={0}
    >
      <GlassCard
        glow={accent.glow}
        className={cn(
          "group/card relative h-full overflow-hidden rounded-2xl",
          "border bg-card/95 text-card-foreground shadow-xl backdrop-blur-none before:opacity-[0.08] dark:bg-[#111318] dark:text-white dark:shadow-2xl",
          "focus-within:ring-2 focus-within:ring-cyan-300/70",
          isAnimated ? "aspect-[2/1]" : "min-h-[320px]",
          accent.border
        )}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-35",
            accent.wash
          )}
        />
        <div className="relative z-10 grid h-full gap-0 lg:grid-cols-2">
          <div className="relative min-h-[220px] overflow-hidden lg:min-h-full [transform:translateZ(28px)]">
            <Image
              src={activity.image}
              alt={activity.imageAlt}
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover transition duration-500 group-hover/card:scale-105"
              style={{ objectPosition: activity.position ?? "center" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/40 dark:from-[#08090c]/44 dark:to-[#111318]/38"
            />
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              <Layers3 className="h-3.5 w-3.5" aria-hidden />
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div className="relative flex flex-col justify-center gap-3 p-5 sm:p-6 [transform:translateZ(42px)]">
            <div>
              <p
                className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.2em]", accent.text)}
              >
                {activity.summary}
              </p>
              <h3
                id={`activity-${activity.id}-title`}
                className="font-utm-akashi text-2xl font-bold leading-tight text-foreground sm:text-3xl dark:text-white"
              >
                {activity.title}
              </h3>
            </div>

            <p className="text-sm leading-6 text-muted-foreground dark:text-white/74">
              {activity.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {activity.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold",
                    accent.badge
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );

  if (isAnimated) {
    return card;
  }

  return (
    <Card3D intensity={4} className="h-full">
      {card}
    </Card3D>
  );
}

export function Activities() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { reducedMotion, shouldRenderMotion } = use3d();
  const isDesktop = useIsDesktop();
  const isScrollSceneEnabled = isDesktop && shouldRenderMotion && !reducedMotion;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-background dark:bg-[#0a0a0a]",
        isScrollSceneEnabled && "h-[420vh]"
      )}
    >
      <SectionShell
        id="activities"
        aria-labelledby="activities-title"
        tone="dark"
        className={cn(
          "overflow-visible border-y border-border bg-background dark:border-white/10 dark:bg-[#0a0a0a]",
          isScrollSceneEnabled
            ? "sticky top-0 flex min-h-screen items-center py-14 lg:py-16"
            : "py-20"
        )}
        contentClassName="max-w-[90rem]"
      >
        <GradientOrb className="-left-20 top-20 h-80 w-80" color="purple" />
        <GradientOrb className="bottom-16 right-0 h-96 w-96" color="cyan" />

        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:w-[calc(100%+4rem)] xl:-translate-x-8 2xl:w-[calc(100%+6rem)] 2xl:-translate-x-12">
          <div className="relative z-20 max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-purple-700 dark:border-purple-300/25 dark:bg-purple-300/10 dark:text-purple-100">
              <Sparkles className="h-4 w-4" aria-hidden />
              {homeActivitiesSectionCopy.badge}
            </div>
            <h2
              id="activities-title"
              className="font-paris2024 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl dark:text-white"
            >
              {homeActivitiesSectionCopy.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg dark:text-white/68">
              {homeActivitiesSectionCopy.description}
            </p>
          </div>

          <div
            className={cn(
              "relative z-10",
              isScrollSceneEnabled
                ? "min-h-[780px] [perspective:1400px]"
                : "grid gap-5 md:grid-cols-2"
            )}
          >
            {homeActivities.map((activity, index) => (
              <ActivityStackCard
                key={activity.id}
                activity={activity}
                index={index}
                isAnimated={isScrollSceneEnabled}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
