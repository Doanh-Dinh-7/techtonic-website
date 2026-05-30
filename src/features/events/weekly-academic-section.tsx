"use client";

import { motion } from "framer-motion";

import { academicActivities, weeklyAcademicIntroShort } from "@/lib/content/events";
import { SectionShell } from "@/shared/ui-v2";

import { ActivityCard } from "./components/activity-card";

export function WeeklyAcademicSection() {
  return (
    <SectionShell
      id="weekly-academic"
      tone="dark"
      align="left"
      className="bg-transparent py-16 lg:py-24"
      contentClassName="max-w-7xl"
      title="Hoạt động học thuật hằng tuần"
      description={weeklyAcademicIntroShort}
    >
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {academicActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </motion.div>
    </SectionShell>
  );
}
