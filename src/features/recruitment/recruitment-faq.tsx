"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

import { recruitmentFaq } from "@/lib/content/faq";
import { recruitmentFaqCopy } from "@/lib/content/recruitment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

export function RecruitmentFaq() {
  return (
    <SectionShell
      id="recruitment-faq"
      tone="dark"
      align="center"
      className="border-t border-white/5 bg-transparent py-16 lg:py-24"
      contentClassName="max-w-2xl"
    >
      <motion.div
        className="mb-8 space-y-4 text-center"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/10 px-4 py-2",
            "font-utm-akashi text-sm uppercase tracking-widest text-neon-cyan"
          )}
        >
          <HelpCircle className="h-3.5 w-3.5" aria-hidden />
          {recruitmentFaqCopy.badge}
        </span>
        <h2 className="font-paris2024 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {recruitmentFaqCopy.title}
        </h2>
        <p className="text-sm text-white/65">{recruitmentFaqCopy.description}</p>
      </motion.div>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {recruitmentFaq.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 backdrop-blur-sm"
          >
            <AccordionTrigger
              className={cn(
                "py-4 text-left text-white/90 hover:no-underline",
                "[&[data-state=open]]:text-neon-cyan"
              )}
            >
              <span>
                {item.q}
                {item.isSample && (
                  <span className="ml-2 text-xs font-normal text-amber-300/80">(mẫu)</span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-white/68">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}
