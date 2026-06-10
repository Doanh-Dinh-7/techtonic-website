"use client";

import Image from "next/image";

import { WebGLFallback } from "@/3d/canvas/webgl-fallback";
import { use3d } from "@/hooks/use3d";
import {
  stellarGalleryCards,
  stellarGallerySectionCopy,
  type StellarGalleryCard,
} from "@/lib/content/events";
import { SectionShell } from "@/shared/ui-v2";

import { StellarGalleryLazy } from "./components/stellar-gallery-lazy";

function StellarGalleryStaticFallback({ cards }: { cards: StellarGalleryCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {cards.map((card) => (
        <figure
          key={card.id}
          className="overflow-hidden rounded-xl border border-white/10 bg-[#1F2121] p-2"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={card.imageUrl}
              alt={card.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
          <figcaption className="mt-2 truncate text-center text-xs text-white/80">
            {card.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function StellarGallerySection() {
  const { isReady, shouldRenderMotion } = use3d();

  return (
    <SectionShell
      id="stellar-gallery"
      tone="dark"
      align="center"
      className="overflow-hidden border-t border-white/10 bg-transparent py-16 lg:py-24"
      contentClassName="max-w-7xl"
      badge={stellarGallerySectionCopy.badge}
      title={stellarGallerySectionCopy.title}
      description={stellarGallerySectionCopy.description}
    >
      {!isReady ? (
        <WebGLFallback className="min-h-[85vh]" />
      ) : shouldRenderMotion ? (
        <StellarGalleryLazy cards={stellarGalleryCards} hint={stellarGallerySectionCopy.hint} />
      ) : (
        <div className="relative min-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-6">
          <StellarGalleryStaticFallback cards={stellarGalleryCards} />
        </div>
      )}
    </SectionShell>
  );
}
