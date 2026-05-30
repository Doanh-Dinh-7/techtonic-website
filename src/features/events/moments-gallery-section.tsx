"use client";

import { motion } from "framer-motion";

import { termEventGalleryColumns, termGallerySectionCopy } from "@/lib/content/events";
import { NeonButton, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

import { MomentTile } from "./components/moment-tile";

export function MomentsGallerySection() {
  return (
    <SectionShell
      id="moments-gallery"
      tone="dark"
      align="center"
      className="overflow-hidden bg-transparent py-16 lg:py-24"
      contentClassName="max-w-7xl"
      title={termGallerySectionCopy.title}
      description={termGallerySectionCopy.description}
    >
      <motion.div
        className="events-masonry-container grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {termEventGalleryColumns.map((column, colIndex) => (
          <div key={colIndex} className={cn("grid gap-8", colIndex === 1 && "lg:pt-12")}>
            {column.map((item) => (
              <MomentTile key={item.id} item={item} />
            ))}
          </div>
        ))}
      </motion.div>
      <div className="mt-16 flex justify-center">
        <NeonButton
          variant="cyan"
          type="button"
          onClick={() =>
            document.getElementById("event-timeline")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {termGallerySectionCopy.cta}
        </NeonButton>
      </div>
    </SectionShell>
  );
}
