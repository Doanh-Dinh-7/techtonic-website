"use client";

import Image from "next/image";

import type { TermEvent } from "@/lib/content/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { GlassCard } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

import { accentLabelMuted, accentOrder, accentTitle } from "../lib/accent-styles";

type TimelineEventRowProps = {
  event: TermEvent;
};

export function TimelineEventRow({ event }: TimelineEventRowProps) {
  const isLeft = event.side === "left";

  return (
    <div
      id={`event-${event.id}`}
      className="relative mb-12 flex w-full scroll-mt-28 flex-col md:mb-16 md:flex-row md:items-center"
    >
      <span
        className={cn(
          "absolute left-1/2 top-6 z-20 hidden h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border bg-[#0a0a0a] font-mono text-xs font-bold md:flex",
          accentOrder[event.accent]
        )}
        aria-hidden
      >
        {event.order}
      </span>
      {isLeft ? (
        <>
          <div className="mb-4 w-full shrink-0 md:mb-0 md:w-[calc(50%-24px)] md:pr-5 md:text-right">
            <TimelineEventCard event={event} align="left" />
          </div>
          <div className="hidden shrink-0 md:block md:w-[calc(50%-24px)]" aria-hidden />
        </>
      ) : (
        <>
          <div className="hidden shrink-0 md:block md:w-[calc(50%-24px)]" aria-hidden />
          <div className="w-full shrink-0 md:ml-auto md:w-[calc(50%-24px)] md:pl-5 md:text-left">
            <TimelineEventCard event={event} align="right" />
          </div>
        </>
      )}
    </div>
  );
}

function TimelineEventCard({ event, align }: { event: TermEvent; align: "left" | "right" }) {
  const textAlign = align === "left" ? "text-left md:text-right" : "text-left";

  return (
    <GlassCard
      glow="none"
      tabIndex={0}
      className={cn(
        "events-hover-reveal relative min-h-[160px] rounded-xl border border-white/10 p-6 outline-none",
        "focus-visible:ring-2 focus-visible:ring-neon-cyan/70",
        textAlign
      )}
    >
      <Image
        src={event.imageSrc}
        alt={event.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="events-hover-reveal-img"
      />
      <div className="events-hover-reveal-content">
        <div
          className={cn(
            "mb-2 flex items-center gap-2",
            align === "left" ? "md:justify-end" : "justify-start"
          )}
        >
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border font-mono text-xs font-bold md:hidden",
              accentOrder[event.accent]
            )}
          >
            {event.order}
          </span>
          <span
            className={cn(
              "font-utm-akashi text-sm uppercase tracking-widest",
              accentLabelMuted[event.accent]
            )}
          >
            {event.label}
          </span>
        </div>
        <h3 className={cn("mb-2 font-utm-akashi text-xl font-normal", accentTitle[event.accent])}>
          {event.title}
        </h3>
        <p className={cn("mb-4 line-clamp-2 text-sm leading-relaxed text-white/68", textAlign)}>
          {event.summary}
        </p>
        {event.detailSections.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            {event.detailSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-white/10 last:border-b-0"
              >
                <AccordionTrigger
                  className={cn(
                    "py-3 text-sm text-white/90 hover:text-neon-cyan hover:no-underline",
                    textAlign
                  )}
                >
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className={textAlign}>
                  <ul
                    className={cn(
                      "space-y-2 text-sm leading-relaxed text-white/68",
                      align === "left" ? "md:list-inside md:text-left" : "list-inside"
                    )}
                  >
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {section.note && (
                    <p className="mt-3 text-sm italic leading-relaxed text-white/55">
                      {section.note}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </GlassCard>
  );
}
