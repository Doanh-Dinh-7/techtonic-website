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
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils";

const roundIcons: Record<RecruitmentRoundIcon, LucideIcon> = {
  file: FileText,
  message: MessageCircle,
  briefcase: Briefcase,
};

export function RecruitmentProcessExtra() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-3 bg-indigo-100 text-indigo-800">{recruitmentProcessTitle}</Badge>
          <h2 className="font-paris2024 text-2xl font-bold text-gray-900 lg:text-3xl">
            Các vòng tuyển chọn
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
            {recruitmentProcessSubtitle}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {recruitmentProcessRounds.map((round, index) => {
            const Icon = roundIcons[round.icon];
            return (
              <motion.div
                key={round.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <Icon className="h-6 w-6 text-indigo-700" />
                </div>
                <h3 className="mb-1 font-semibold text-gray-900">{round.title}</h3>
                <p className="mb-2 text-xs text-indigo-700">{round.appliesTo}</p>
                <p className="text-sm text-gray-600">{round.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={cn(
            "mx-auto mt-8 max-w-3xl rounded-xl border border-amber-200",
            "bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900"
          )}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-semibold">Lưu ý: </span>
          {recruitmentProcessNote}
        </motion.div>
      </div>
    </section>
  );
}
