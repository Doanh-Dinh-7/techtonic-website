"use client";

import { motion } from "framer-motion";
import { Briefcase, FileText, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  recruitmentProcessNote,
  recruitmentProcessRounds,
  recruitmentProcessSubtitle,
  recruitmentProcessTitle,
} from "@/lib/content/recruitment-process";
import type { RecruitmentRoundIcon } from "@/lib/content/types";
import { SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const roundIcons: Record<RecruitmentRoundIcon, LucideIcon> = {
  file: FileText,
  message: MessageCircle,
  briefcase: Briefcase,
};

export function RecruitmentProcessExtra() {
  return (
    <SectionShell
      id="recruitment-process"
      tone="dark"
      align="center"
      className="border-t border-white/5 bg-transparent py-16 lg:py-24"
      badge="Tuyển thành viên"
      title={recruitmentProcessTitle}
      description={recruitmentProcessSubtitle}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {recruitmentProcessRounds.map((round, index) => {
          const Icon = roundIcons[round.icon];
          return (
            <motion.div
              key={round.id}
              className="rounded-xl border border-border bg-card/90 p-6 text-left shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-700/10 dark:bg-neon-cyan/10">
                <Icon className="h-6 w-6 text-cyan-500 dark:text-neon-cyan" />
              </div>
              <h3 className="mb-1 font-semibold text-foreground dark:text-white">{round.title}</h3>
              <p className="mb-3 text-xs font-medium text-cyan-500 dark:text-neon-cyan/80">
                {round.appliesTo}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/65">
                {round.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className={cn(
          "mx-auto mt-8 max-w-3xl rounded-xl border border-amber-400/20",
          "bg-amber-500/10 px-5 py-4 text-sm leading-relaxed text-amber-800 dark:bg-amber-500/5 dark:text-amber-100/90"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span className="font-semibold text-amber-600 dark:text-amber-200">Lưu ý: </span>
        {recruitmentProcessNote}
      </motion.div>
    </SectionShell>
  );
}
