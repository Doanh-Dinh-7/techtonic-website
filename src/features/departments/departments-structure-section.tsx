"use client";

import { motion } from "framer-motion";

import { departmentsStructureCopy } from "@/lib/content/departments";
import { DepartmentsOrgChart } from "@/features/departments/components/departments-org-chart";
import { SectionShell } from "@/shared/ui-v2";

export function DepartmentsStructureSection() {
  return (
    <SectionShell
      id="departments-structure"
      tone="dark"
      align="center"
      className="bg-transparent py-16 lg:py-24"
      title={departmentsStructureCopy.title}
      description={departmentsStructureCopy.description}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <DepartmentsOrgChart />
      </motion.div>
    </SectionShell>
  );
}
