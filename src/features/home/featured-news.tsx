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
    badge: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
    cta: "group-hover:text-neon-cyan",
    arrow:
      "border-neon-cyan/35 bg-neon-cyan/10 text-neon-cyan group-hover:border-neon-cyan/60 group-hover:bg-neon-cyan/20 group-hover:shadow-[0_0_16px_rgba(0,245,255,0.35)]",
  },
  purple: {
    badge: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
    cta: "group-hover:text-neon-purple",
    arrow:
      "border-neon-purple/35 bg-neon-purple/10 text-neon-purple group-hover:border-neon-purple/60 group-hover:bg-neon-purple/20 group-hover:shadow-[0_0_16px_rgba(168,85,247,0.35)]",
  },
  magenta: {
    badge: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
    cta: "group-hover:text-fuchsia-300",
    arrow:
      "border-fuchsia-400/35 bg-fuchsia-400/10 text-fuchsia-300 group-hover:border-fuchsia-400/60 group-hover:bg-fuchsia-400/20 group-hover:shadow-[0_0_16px_rgba(255,43,214,0.3)]",
  },
} as const;

function NewsCardCta({ item }: { item: NewsItem }) {
  const glow = item.glow ?? "cyan";
  const accent = glowAccentClasses[glow];
  const className = cn(
    "group/cta mt-auto flex w-full items-center justify-between gap-3 border-t border-white/10 pt-4",
    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
  );
  const content = (
    <>
      <span
        className={cn(
          "text-sm font-semibold tracking-wide text-white/65 transition-colors",
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
      className="border-t border-white/10 py-16 lg:py-24"
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
            "inline-flex items-center gap-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-4 py-2",
            "font-utm-akashi text-sm uppercase tracking-widest text-neon-cyan"
          )}
        >
          <Newspaper className="h-3.5 w-3.5" aria-hidden />
          Tin nổi bật
        </span>
        <h2 className="font-paris2024 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Cập nhật mới nhất
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-white/68">
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
                  <h3 className="mb-2 line-clamp-2 min-h-[3.25rem] font-utm-akashi text-lg leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-xs text-white/55">{item.date}</p>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-white/68">
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
