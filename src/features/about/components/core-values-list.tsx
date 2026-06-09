"use client";

import type { LucideIcon } from "lucide-react";
import { Handshake, Heart, PartyPopper, Share2, Shield, Sparkles, Users } from "lucide-react";

import type { AboutCoreValue } from "@/lib/content/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { cn } from "@/shared/utils";

const valueIcons: Record<AboutCoreValue["icon"], LucideIcon> = {
  share: Share2,
  support: Users,
  heart: Heart,
  handshake: Handshake,
  shield: Shield,
  sparkles: Sparkles,
  party: PartyPopper,
};

type CoreValuesListProps = {
  values: AboutCoreValue[];
};

export function CoreValuesList({ values }: CoreValuesListProps) {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      {values.map((value) => {
        const Icon = valueIcons[value.icon];
        const isCyan = value.accent === "cyan";

        return (
          <AccordionItem
            key={value.id}
            value={value.id}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 backdrop-blur-sm"
          >
            <AccordionTrigger
              className={cn(
                "py-4 text-left hover:no-underline",
                "[&[data-state=open]]:text-neon-cyan"
              )}
            >
              <div className="flex items-start gap-3 pr-2">
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    isCyan ? "bg-neon-cyan/10 text-neon-cyan" : "bg-neon-purple/10 text-neon-purple"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4
                    className={cn(
                      "font-utm-akashi text-base font-normal leading-snug md:text-lg",
                      isCyan ? "text-neon-cyan" : "text-neon-purple"
                    )}
                  >
                    {value.title}
                  </h4>
                  {value.subtitle && (
                    <p className="text-xs leading-relaxed text-white/45">({value.subtitle})</p>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pl-12 text-sm leading-relaxed text-white/68">
              {value.description}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
