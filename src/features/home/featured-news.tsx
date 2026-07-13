"use client";

import { motion } from "framer-motion";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

import { featuredNews } from "@/lib/content/news";
import type { NewsItem } from "@/lib/content/types";
import { Card3D, GlassCard, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const glowAccentClasses = {
  cyan: {
    badge:
      "border-cyan-600/30 bg-cyan-600/10 text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-100",
    cta: "group-hover:text-cyan-700 dark:group-hover:text-cyan-200",
    arrow:
      "border-cyan-600/35 bg-cyan-600/10 text-cyan-700 group-hover:border-cyan-600/60 group-hover:bg-cyan-600/20 group-hover:shadow-[0_0_16px_rgba(8,145,178,0.22)] dark:border-cyan-300/35 dark:bg-cyan-300/10 dark:text-cyan-200 dark:group-hover:border-cyan-300/60 dark:group-hover:bg-cyan-300/20 dark:group-hover:shadow-[0_0_16px_rgba(0,245,255,0.35)]",
  },
  purple: {
    badge:
      "border-purple-600/30 bg-purple-600/10 text-purple-700 dark:border-purple-300/30 dark:bg-purple-300/10 dark:text-purple-200",
    cta: "group-hover:text-purple-700 dark:group-hover:text-purple-200",
    arrow:
      "border-purple-600/35 bg-purple-600/10 text-purple-700 group-hover:border-purple-600/60 group-hover:bg-purple-600/20 group-hover:shadow-[0_0_16px_rgba(126,34,206,0.22)] dark:border-purple-300/35 dark:bg-purple-300/10 dark:text-purple-200 dark:group-hover:border-purple-300/60 dark:group-hover:bg-purple-300/20 dark:group-hover:shadow-[0_0_16px_rgba(168,85,247,0.35)]",
  },
  magenta: {
    badge:
      "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-300",
    cta: "group-hover:text-fuchsia-700 dark:group-hover:text-fuchsia-300",
    arrow:
      "border-fuchsia-500/35 bg-fuchsia-500/10 text-fuchsia-700 group-hover:border-fuchsia-500/60 group-hover:bg-fuchsia-500/20 group-hover:shadow-[0_0_16px_rgba(255,43,214,0.22)] dark:border-fuchsia-400/35 dark:bg-fuchsia-400/10 dark:text-fuchsia-300 dark:group-hover:border-fuchsia-400/60 dark:group-hover:bg-fuchsia-400/20",
  },
} as const;

function NewsCardCta({ item }: { item: NewsItem }) {
  const glow = item.glow ?? "cyan";
  const accent = glowAccentClasses[glow];
  const className = cn(
    "group/cta mt-auto flex w-full items-center justify-between gap-3 border-t border-border pt-4 dark:border-white/10",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
  );
  const content = (
    <>
      <span
        className={cn(
          "text-sm font-semibold tracking-wide text-muted-foreground transition-colors dark:text-white/65",
          accent.cta
        )}
      >
        Xem thêm
      </span>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
          "group-hover/cta:translate-x-0.5",
          accent.arrow
        )}
      >
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </>
  );

  if (item.external || item.href.startsWith("http")) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

export function FeaturedNews() {
  return (
    <SectionShell
      id="news"
      tone="dark"
      align="center"
      className="border-t border-border py-16 dark:border-white/10 lg:py-24"
      contentClassName="max-w-7xl"
    >
      <motion.div
        className="mb-12 space-y-4 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-cyan-600/25 bg-cyan-600/10 px-4 py-2",
            "font-utm-akashi text-sm uppercase tracking-widest text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100"
          )}
        >
          <Newspaper className="h-3.5 w-3.5" aria-hidden />
          Tin nổi bật
        </span>
        <h2 className="font-paris2024 text-3xl font-bold tracking-tight text-foreground sm:text-5xl dark:text-white">
          Cập nhật mới nhất
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground dark:text-white/68">
          Tin tức và hoạt động nổi bật từ các trang chính thức của CLB.
        </p>
      </motion.div>

      <div className="grid items-stretch gap-6 md:grid-cols-3 md:auto-rows-fr">
        {featuredNews.map((item, index) => {
          const glow = item.glow ?? "cyan";
          const accent = glowAccentClasses[glow];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex h-full min-h-0 flex-col"
            >
              <Card3D intensity={8} className="h-full">
                <GlassCard glow={glow} className="flex h-full min-h-[280px] flex-col p-6 text-left">
                  {item.badge && (
                    <span
                      className={cn(
                        "mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                        accent.badge
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  <h3 className="mb-2 line-clamp-2 min-h-[3.25rem] font-utm-akashi text-lg leading-snug text-foreground dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-xs text-muted-foreground dark:text-white/55">
                    {item.date}
                  </p>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground dark:text-white/68">
                    {item.excerpt}
                  </p>
                  <NewsCardCta item={item} />
                </GlassCard>
              </Card3D>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
