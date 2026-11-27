"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  ExternalLink,
  Gamepad2,
  Hand,
  Loader2,
  Maximize2,
  Minimize2,
  Play,
  PowerOff,
  RotateCcw,
  Scan,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

import { liveGesturePuzzle, type PlaygroundStep } from "@/lib/content/playground";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card3D, GlassCard, GradientOrb, NeonButton, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const stepIconMap: Record<PlaygroundStep["icon"], typeof Scan> = {
  scan: Scan,
  hand: Hand,
  trophy: Trophy,
};

const stepAccentClasses: Record<
  PlaygroundStep["accent"],
  {
    badge: string;
    iconBox: string;
    hint: string;
  }
> = {
  cyan: {
    badge:
      "border-cyan-600/30 bg-cyan-600/10 text-cyan-800 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-100",
    iconBox:
      "border-cyan-500/35 bg-cyan-500/10 text-cyan-700 dark:border-cyan-300/40 dark:bg-cyan-300/15 dark:text-cyan-200",
    hint: "text-cyan-700 dark:text-cyan-300",
  },
  purple: {
    badge:
      "border-purple-600/30 bg-purple-600/10 text-purple-800 dark:border-purple-300/30 dark:bg-purple-300/10 dark:text-purple-100",
    iconBox:
      "border-purple-500/35 bg-purple-500/10 text-purple-700 dark:border-purple-300/40 dark:bg-purple-300/15 dark:text-purple-200",
    hint: "text-purple-700 dark:text-purple-300",
  },
  magenta: {
    badge:
      "border-fuchsia-600/30 bg-fuchsia-600/10 text-fuchsia-800 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-200",
    iconBox:
      "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-700 dark:border-fuchsia-400/40 dark:bg-fuchsia-400/15 dark:text-fuchsia-200",
    hint: "text-fuchsia-700 dark:text-fuchsia-300",
  },
};

export function PlaygroundContent() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const handleLaunch = () => {
    setIsFrameLoaded(false);
    setIsLaunched(true);
  };

  const handleReload = () => {
    setIsFrameLoaded(false);
    setReloadKey((prev) => prev + 1);
  };

  const handleStop = () => {
    setIsLaunched(false);
    setIsFrameLoaded(false);
    setIsExpanded(false);
  };

  return (
    <div className="v2-dark-shell min-h-screen">
      <SectionShell
        id="playground-stage"
        tone="dark"
        align="center"
        className="border-b border-border px-1.5 py-6 dark:border-white/10 sm:px-3 lg:px-4 lg:py-8"
        contentClassName="w-full max-w-none"
      >
        <GradientOrb className="-left-24 top-6 h-80 w-80" color="cyan" />
        <GradientOrb className="-right-20 bottom-10 h-80 w-80" color="purple" />

        <motion.div
          className="mx-auto mb-8 max-w-4xl space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-cyan-600/25 bg-cyan-600/10 px-4 py-1.5",
              "font-utm-akashi text-xs uppercase tracking-[0.22em] text-cyan-800 dark:border-cyan-300/25 dark:bg-cyan-300/10 dark:text-cyan-100"
            )}
          >
            <Gamepad2 className="h-3.5 w-3.5" aria-hidden />
            {liveGesturePuzzle.badge}
          </span>

          <h1 className="font-paris2024 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:text-white">
            {liveGesturePuzzle.title}
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base dark:text-white/75">
            {liveGesturePuzzle.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {liveGesturePuzzle.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="border border-border bg-secondary/80 text-foreground dark:border-white/15 dark:bg-white/[0.06] dark:text-white/85"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        <GlassCard
          glow="cyan"
          className={cn(
            "w-full overflow-hidden border-cyan-500/30",
            isExpanded
              ? "fixed inset-0 z-[60] flex flex-col rounded-none border-0 bg-background/95 p-1.5 backdrop-blur-xl sm:p-2"
              : "p-1.5 sm:p-2"
          )}
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background/80 px-4 py-2.5 dark:border-white/10 dark:bg-black/40">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  isLaunched
                    ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)] motion-reduce:animate-none animate-pulse"
                    : "bg-cyan-500"
                )}
              />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground dark:text-white">
                {isLaunched
                  ? liveGesturePuzzle.launchCard.statusLive
                  : liveGesturePuzzle.launchCard.statusIdle}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="min-h-11 gap-1.5"
              >
                {isExpanded ? (
                  <>
                    <Minimize2 className="h-4 w-4" aria-hidden />
                    Thu nhỏ
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" aria-hidden />
                    Phóng to
                  </>
                )}
              </Button>
              {isLaunched && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleReload}
                    className="min-h-11 gap-1.5"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Tải lại
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleStop}
                    className="min-h-11 gap-1.5"
                  >
                    <PowerOff className="h-4 w-4" aria-hidden />
                    Đóng khung game
                  </Button>
                </>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                asChild
                className="min-h-11 gap-1.5"
              >
                <a href={liveGesturePuzzle.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Mở tab mới
                </a>
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "relative w-full overflow-hidden rounded-2xl border border-[#00d4ff]/30 bg-blue-950",
              isExpanded ? "min-h-0 flex-1" : "h-[86vh] min-h-[680px] lg:h-[90vh] lg:min-h-[780px]"
            )}
          >
            {!isLaunched ? (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-600 to-[#00d4ff] px-3 py-4 font-mono sm:px-6 sm:py-5">
                <div className="text-center">
                  <p className="font-sans text-3xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg sm:text-4xl md:text-5xl">
                    {liveGesturePuzzle.launchCard.brandTitle}
                  </p>
                  <p className="mt-1.5 font-sans text-xs font-medium text-blue-100 drop-shadow sm:text-sm">
                    {liveGesturePuzzle.launchCard.brandSubtitle}
                  </p>
                </div>

                <div className="relative mt-4 flex w-[95%] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-blue-950 p-6 shadow-2xl">
                  <div className="absolute left-4 top-4 hidden items-center gap-2 rounded-full border border-white/20 bg-blue-900/80 px-4 py-2 text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:flex">
                    <Gamepad2 className="h-4 w-4 text-[#00d4ff]" aria-hidden />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {liveGesturePuzzle.launchCard.hudLeftBadge}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute right-6 top-6 hidden min-w-[270px] rounded-xl border border-[#00d4ff]/20 bg-blue-900/80 p-4 text-sm text-white shadow-2xl backdrop-blur-md lg:block">
                    <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2">
                      <span
                        aria-hidden
                        className="h-2 w-2 rounded-full bg-[#00d4ff] animate-pulse motion-reduce:animate-none"
                      />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#00d4ff]">
                        {liveGesturePuzzle.launchCard.hudRightTitle}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-blue-100">
                      {liveGesturePuzzle.launchCard.hudRightItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00d4ff]/50 bg-[#00d4ff]/10 shadow-[0_0_24px_rgba(0,212,255,0.25)]">
                      <Camera className="h-9 w-9 text-[#00d4ff]" aria-hidden />
                    </div>

                    <h2 className="font-sans text-2xl font-bold text-white sm:text-3xl">
                      {liveGesturePuzzle.launchCard.title}
                    </h2>

                    <p className="mt-3 font-sans text-sm leading-relaxed text-blue-100/85 sm:text-base">
                      {liveGesturePuzzle.launchCard.description}
                    </p>

                    <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleLaunch}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#00d4ff] px-7 py-3 font-sans text-sm font-bold text-blue-950 shadow-[0_0_24px_rgba(0,212,255,0.35)] transition hover:scale-[1.02] hover:bg-[#00b8e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
                      >
                        <Play className="h-4 w-4" aria-hidden />
                        {liveGesturePuzzle.launchCard.primaryCta}
                      </button>

                      <a
                        href={liveGesturePuzzle.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-blue-900/80 px-6 py-3 font-sans text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#00d4ff]/60 hover:bg-blue-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden />
                        {liveGesturePuzzle.launchCard.secondaryCta}
                      </a>
                    </div>

                    <p className="mt-4 font-sans text-xs text-blue-200/75">
                      {liveGesturePuzzle.launchCard.cameraHint}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!isFrameLoaded && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-blue-950 text-white">
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 animate-spin rounded-full border-b-2 border-t-2 border-[#00d4ff] motion-reduce:animate-none" />
                      <Loader2
                        className="h-7 w-7 animate-spin text-[#00d4ff] motion-reduce:animate-none"
                        aria-hidden
                      />
                    </div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#00d4ff]">
                      Đang tải AI Gesture Puzzle...
                    </p>
                  </div>
                )}

                <iframe
                  key={reloadKey}
                  src={liveGesturePuzzle.url}
                  title={liveGesturePuzzle.iframeTitle}
                  allow="camera; fullscreen; autoplay"
                  allowFullScreen
                  onLoad={() => setIsFrameLoaded(true)}
                  className="h-full w-full border-0"
                />
              </>
            )}
          </div>

          {!isExpanded && (
            <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-border bg-secondary/45 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-white/[0.03] dark:text-white/70">
              <p className="flex items-start gap-2 sm:items-center">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-300 sm:mt-0"
                  aria-hidden
                />
                <span>{liveGesturePuzzle.privacyNote}</span>
              </p>
              <p className="shrink-0 sm:max-w-xs sm:text-right">{liveGesturePuzzle.fallbackNote}</p>
            </div>
          )}
        </GlassCard>
      </SectionShell>

      <SectionShell
        id="playground-guide"
        tone="dark"
        align="center"
        badge="Hướng dẫn nhanh"
        title="Cách chơi AI Gesture Puzzle"
        description="Chỉ cần webcam (hoặc dùng chuột kéo thả trực tiếp trên màn hình trò chơi) để thử thách tốc độ."
        className="py-16 lg:py-20"
        contentClassName="max-w-6xl"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {liveGesturePuzzle.steps.map((step, index) => {
            const Icon = stepIconMap[step.icon];
            const accent = stepAccentClasses[step.accent];

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card3D intensity={6} className="h-full">
                  <GlassCard glow={step.accent} className="flex h-full flex-col p-6 text-left">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                          accent.badge
                        )}
                      >
                        {step.stepLabel}
                      </span>
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl border",
                          accent.iconBox
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                    </div>

                    <h3 className="mb-2 font-utm-akashi text-lg font-bold text-foreground dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-6 text-muted-foreground dark:text-white/70">
                      {step.description}
                    </p>
                    <p
                      className={cn("font-mono text-xs font-semibold tracking-wider", accent.hint)}
                    >
                      {step.hint}
                    </p>
                  </GlassCard>
                </Card3D>
              </motion.div>
            );
          })}
        </div>

        <GlassCard glow="purple" className="mt-12 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-200">
                <Sparkles className="h-4 w-4" aria-hidden />
                Sản phẩm thực tế từ Ban Chuyên Môn
              </div>
              <h3 className="font-paris2024 text-2xl font-bold text-foreground dark:text-white">
                Muốn cùng team tạo ra những sản phẩm công nghệ như thế này?
              </h3>
              <p className="max-w-2xl text-sm text-muted-foreground dark:text-white/70">
                Khám phá cơ cấu Ban Chuyên Môn hoặc đăng ký gia nhập TechTonic Club để thực chiến
                cùng các dự án AI, Web và Product Team.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <NeonButton asChild variant="purple" className="min-h-11">
                <Link href="/departments">Tìm hiểu Các ban</Link>
              </NeonButton>
              <Button
                asChild
                className="min-h-11 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/recruitment">
                  <Users className="mr-2 h-4 w-4" aria-hidden />
                  Tuyển thành viên
                </Link>
              </Button>
            </div>
          </div>
        </GlassCard>
      </SectionShell>
    </div>
  );
}
