"use client";

import { motion } from "framer-motion";

import { departmentsBookCopy } from "@/lib/content/departments";
import { DepartmentsBook } from "@/features/departments/components/departments-book";
import { SectionShell } from "@/shared/ui-v2";

export function DepartmentsBookSection() {
  return (
    <SectionShell
      id="departments-book"
      tone="dark"
      align="center"
      className="border-t border-white/5 bg-transparent py-16 lg:py-24"
      title={departmentsBookCopy.title}
      description={departmentsBookCopy.description}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <DepartmentsBook />
      </motion.div>
    </SectionShell>
  );
}
