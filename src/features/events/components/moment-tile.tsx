"use client";

import Image from "next/image";

import type { TermEventGalleryItem } from "@/lib/content/types";
import { GlassCard } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

type MomentTileProps = {
  item: TermEventGalleryItem;
};

const glowGradient = {
  cyan: "from-neon-cyan/20",
  purple: "from-neon-purple/20",
} as const;

export function MomentTile({ item }: MomentTileProps) {
  return (
    <GlassCard
      glow="none"
      tabIndex={0}
      className="events-masonry-item relative overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70"
      aria-label={`${item.order}. ${item.title}`}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        width={800}
        height={600}
        className={cn("w-full object-cover", item.imageClassName)}
      />
      <div
        className={cn(
          "events-moment-glow pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500",
          glowGradient[item.glow]
        )}
        aria-hidden
      />
      <div className="events-moment-label absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4 opacity-0 transition-all duration-300">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neon-cyan/40 bg-black/60 font-mono text-sm font-bold text-neon-cyan">
          {item.order}
        </span>
        <p className="font-utm-akashi text-base font-normal leading-snug text-white">
          {item.title}
        </p>
      </div>
    </GlassCard>
  );
}
