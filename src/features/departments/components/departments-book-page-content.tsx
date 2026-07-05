"use client";

import type { DepartmentBookPage, DepartmentBookPhase } from "@/lib/content/types";
import { departmentColorStyles } from "@/features/departments/lib/department-colors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { cn } from "@/shared/utils";

export type BookLayout = "portrait" | "landscape";

type DepartmentsBookPageContentProps = {
  page: DepartmentBookPage;
  className?: string;
  layout?: BookLayout;
};

export function DepartmentsBookPageContent({
  page,
  className,
  layout = "portrait",
}: DepartmentsBookPageContentProps) {
  const colors = departmentColorStyles[page.color];
  const isLandscape = layout === "landscape";

  if (page.isCover) {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center gap-4 p-6 text-center sm:p-8",
          isLandscape && "md:flex-row md:items-center md:gap-10 md:text-left",
          className
        )}
      >
        <div className={cn("space-y-4", isLandscape && "md:max-w-[45%]")}>
          <div
            className={cn(
              "inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest",
              colors.badge,
              "border"
            )}
          >
            TechTonic Club
          </div>
          <h2
            className={cn(
              "font-paris2024 text-3xl font-bold text-white",
              isLandscape ? "md:text-4xl lg:text-5xl" : "sm:text-4xl"
            )}
          >
            {page.title}
          </h2>
          {page.subtitle && <p className={cn("text-lg italic", colors.text)}>{page.subtitle}</p>}
        </div>
        <div className={cn("space-y-4", isLandscape && "md:max-w-[50%]")}>
          <p className="text-sm leading-relaxed text-white/60">{page.overview[0]}</p>
          <p className="text-xs text-white/40">
            {isLandscape
              ? "Nhấn mũi tên hoặc nút hai bên để lật trang →"
              : "Nhấn mũi tên hoặc nút bên cạnh để lật trang →"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      <div className={cn("shrink-0 border-b px-5 py-4", colors.border, colors.bgMuted)}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2
            className={cn(
              "font-paris2024 font-bold text-white",
              isLandscape ? "text-xl md:text-2xl" : "text-xl sm:text-2xl"
            )}
          >
            {page.title}
          </h2>
          {page.memberCount && (
            <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", colors.badge)}>
              {page.memberCount}
            </span>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto px-5 py-4",
          isLandscape && "md:grid md:grid-cols-2 md:gap-6 md:overflow-hidden"
        )}
      >
        {isLandscape ? (
          <>
            <div className="space-y-5 md:overflow-y-auto md:pr-1">
              <div className="space-y-3">
                {page.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-white/75">
                    {paragraph}
                  </p>
                ))}
              </div>
              {page.skills && page.skills.length > 0 && (
                <SkillsSection skills={page.skills} dotClass={colors.dot} />
              )}
            </div>
            {page.phases && page.phases.length > 0 && (
              <div className="md:overflow-y-auto md:pl-1">
                <PhasesSection phases={page.phases} dotClass={colors.dot} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="space-y-3">
              {page.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-white/75">
                  {paragraph}
                </p>
              ))}
            </div>
            {page.phases && page.phases.length > 0 && (
              <div className="mt-5">
                <PhasesSection phases={page.phases} dotClass={colors.dot} />
              </div>
            )}
            {page.skills && page.skills.length > 0 && (
              <div className="mt-5">
                <SkillsSection skills={page.skills} dotClass={colors.dot} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PhasesSection({ phases, dotClass }: { phases: DepartmentBookPhase[]; dotClass: string }) {
  return (
    <>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/50">
        Nhiệm vụ chính
      </h3>
      <Accordion type="single" collapsible className="space-y-1">
        {phases.map((phase, index) => (
          <AccordionItem key={phase.title} value={`phase-${index}`} className="border-white/10">
            <AccordionTrigger className="py-2 text-left text-sm text-white/90 hover:no-underline">
              {phase.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1.5 pb-2">
                {phase.items.map((item) => (
                  <li key={item.slice(0, 30)} className="flex gap-2 text-sm text-white/70">
                    <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", dotClass)} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

function SkillsSection({ skills, dotClass }: { skills: string[]; dotClass: string }) {
  return (
    <>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/50">
        Kỹ năng cần có
      </h3>
      <ul className="space-y-1.5">
        {skills.map((skill) => (
          <li key={skill.slice(0, 30)} className="flex gap-2 text-sm text-white/70">
            <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", dotClass)} />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
