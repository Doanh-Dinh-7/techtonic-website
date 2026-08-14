"use client";

import { orgChartNodes } from "@/lib/content/departments";
import { OrgChartInfoNode } from "@/features/departments/components/org-chart-info-node";
import { departmentColorStyles } from "@/features/departments/lib/department-colors";
import { useShiftWheelHorizontalScroll } from "@/shared/hooks/use-shift-wheel-horizontal-scroll";
import { cn } from "@/shared/utils";

export function DepartmentsOrgChart() {
  const scrollRef = useShiftWheelHorizontalScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className="departments-org-scroll overflow-x-auto overscroll-contain rounded-2xl border border-border bg-card/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.02] sm:p-6"
      aria-label="Sơ đồ cơ cấu Câu lạc bộ TechTonic"
      tabIndex={0}
    >
      <div className="mx-auto min-w-[880px] max-w-5xl">
        <div className="rounded-xl border-2 border-dashed border-cyan-500/30 bg-cyan-500/10 p-4 dark:border-cyan-400/30 dark:bg-cyan-500/5 sm:p-6">
          <OrgChartInfoNode
            node={orgChartNodes.club}
            className="mx-auto mb-6 max-w-md border-cyan-400/30 bg-cyan-500/10"
          />

          <div
            className={cn(
              "mb-4 rounded-xl border p-4",
              departmentColorStyles.pink.bgMuted,
              departmentColorStyles.pink.border
            )}
          >
            <OrgChartInfoNode
              node={orgChartNodes.executiveBoard}
              showInfo
              className="mx-auto mb-4 max-w-xs"
            />

            <div className="mb-4 flex justify-center gap-3">
              <OrgChartInfoNode
                node={orgChartNodes.president}
                className={cn(
                  "min-w-[120px] font-semibold",
                  departmentColorStyles.purple.bg,
                  "border-purple-600 text-white"
                )}
              />
              <OrgChartInfoNode
                node={orgChartNodes.vicePresident}
                className={cn(
                  "min-w-[120px] font-medium",
                  departmentColorStyles.purple.bgDeputy,
                  departmentColorStyles.purple.borderDeputy,
                  departmentColorStyles.purple.textDeputy
                )}
              />
            </div>

            <div className="mx-auto mb-3 h-4 w-px bg-border dark:bg-white/20" aria-hidden />

            <div className="grid grid-cols-5 gap-3">
              <DepartmentColumn
                deptNode={orgChartNodes.events}
                headNode={orgChartNodes.eventsHead}
                deputyNode={orgChartNodes.eventsDeputy}
                membersNode={orgChartNodes.eventsMembers}
                color="red"
              />
              <DepartmentColumn
                deptNode={orgChartNodes.hr}
                headNode={orgChartNodes.hrHead}
                deputyNode={orgChartNodes.hrDeputy}
                membersNode={orgChartNodes.hrMembers}
                color="yellow"
              />
              <DepartmentColumn
                deptNode={orgChartNodes.media}
                headNode={orgChartNodes.mediaHead}
                deputyNode={orgChartNodes.mediaDeputy}
                membersNode={orgChartNodes.mediaMembers}
                color="green"
              />
              <DepartmentColumn
                deptNode={orgChartNodes.tech}
                headNode={orgChartNodes.techHead}
                deputyNode={orgChartNodes.techDeputy}
                membersNode={orgChartNodes.techMembers}
                color="orange"
              />
              <AdvisorColumn />
            </div>
          </div>

          <div
            className={cn(
              "rounded-xl border p-4",
              departmentColorStyles.blue.bgMuted,
              departmentColorStyles.blue.border
            )}
          >
            <OrgChartInfoNode
              node={orgChartNodes.freeMembers}
              className={cn(
                "mx-auto mb-4 max-w-sm font-semibold",
                departmentColorStyles.blue.bgMuted,
                departmentColorStyles.blue.border
              )}
            />
            <div className="grid grid-cols-5 gap-3">
              {(
                [
                  orgChartNodes.pythonDb,
                  orgChartNodes.backend,
                  orgChartNodes.frontend,
                  orgChartNodes.dataAi,
                  orgChartNodes.product,
                ] as const
              ).map((node) => (
                <OrgChartInfoNode
                  key={node.id}
                  node={node}
                  compact
                  className="border-border bg-card/80 dark:border-white/20 dark:bg-white/5"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type DeptColor = "red" | "yellow" | "green" | "orange";

function DepartmentColumn({
  deptNode,
  headNode,
  deputyNode,
  membersNode,
  color,
}: {
  deptNode: (typeof orgChartNodes)[keyof typeof orgChartNodes];
  headNode: (typeof orgChartNodes)[keyof typeof orgChartNodes];
  deputyNode: (typeof orgChartNodes)[keyof typeof orgChartNodes];
  membersNode: (typeof orgChartNodes)[keyof typeof orgChartNodes];
  color: DeptColor;
}) {
  const styles = departmentColorStyles[color];

  return (
    <div className={cn("flex flex-col gap-2 rounded-lg border p-2", styles.bgMuted, styles.border)}>
      <OrgChartInfoNode node={deptNode} showInfo compact />
      <OrgChartInfoNode
        node={headNode}
        compact
        className={cn("font-medium text-white", styles.bg, "border-transparent")}
      />
      <OrgChartInfoNode
        node={deputyNode}
        compact
        className={cn("font-medium", styles.bgDeputy, styles.borderDeputy, styles.textDeputy)}
      />
      <OrgChartInfoNode
        node={membersNode}
        compact
        dashed
        className={cn(styles.bgMuted, styles.border)}
      />
    </div>
  );
}

function AdvisorColumn() {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-2",
        "border-border bg-card/80 dark:border-white/20 dark:bg-white/5"
      )}
    >
      <OrgChartInfoNode node={orgChartNodes.advisors} showInfo compact />
      <OrgChartInfoNode
        node={orgChartNodes.studentAdvisor}
        compact
        className={cn(
          "font-medium text-white",
          departmentColorStyles.blue.bg,
          "border-transparent"
        )}
      />
      <OrgChartInfoNode
        node={orgChartNodes.facultyAdvisor}
        compact
        className={cn(
          "font-medium",
          departmentColorStyles.blue.bgDeputy,
          departmentColorStyles.blue.borderDeputy,
          departmentColorStyles.blue.textDeputy
        )}
      />
    </div>
  );
}
