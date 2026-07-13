"use client";

import { motion } from "framer-motion";

import { termEvents } from "@/lib/content/events";
import { SectionShell } from "@/shared/ui-v2";

import { TimelineEventRow } from "./components/timeline-event-row";

export function EventTimelineSection() {
  return (
    <SectionShell
      id="event-timeline"
      tone="dark"
      align="center"
      className="bg-transparent py-16 lg:py-24"
      contentClassName="max-w-4xl"
      title="Hoạt động & sự kiện"
      description="Chuỗi hoạt động chính của một nhiệm kỳ"
    >
      <motion.div
        className="relative w-full py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="events-timeline-line hidden md:block" aria-hidden />
        {termEvents.map((event) => (
          <TimelineEventRow key={event.id} event={event} />
        ))}
      </motion.div>
    </SectionShell>
  );
}
