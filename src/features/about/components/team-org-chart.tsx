"use client";

import type { AboutTeamLevel, AboutTeamMember } from "@/lib/content/types";
import {
  getAboutTeamCardSize,
  getAboutTeamCardWidth,
  getRowLevel,
} from "@/features/about/lib/team-level";
import { useShiftWheelHorizontalScroll } from "@/shared/hooks/use-shift-wheel-horizontal-scroll";

import { TeamOrgConnector } from "./team-org-connector";
import { TeamOrgLevel } from "./team-org-level";

const CARD_GAP = 24;
const CHART_PADDING_X = 48;

function computeLevelWidth(members: AboutTeamMember[]): number {
  if (members.length === 0) return 0;

  const cardWidth = getAboutTeamCardWidth(getRowLevel(members));
  return members.length * cardWidth + Math.max(0, members.length - 1) * CARD_GAP;
}

function computeChartWidth(hierarchy: AboutTeamMember[][]): number {
  if (hierarchy.length === 0) return 320;

  const levelWidths = hierarchy.map(computeLevelWidth);
  return Math.max(...levelWidths, 280) + CHART_PADDING_X * 2;
}

type TeamOrgChartProps = {
  hierarchy: AboutTeamMember[][];
};

export function TeamOrgChart({ hierarchy }: TeamOrgChartProps) {
  const chartWidth = computeChartWidth(hierarchy);
  const scrollRef = useShiftWheelHorizontalScroll<HTMLDivElement>();

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="about-team-org-scroll max-h-[min(160vh)] overflow-auto overscroll-contain rounded-2xl border border-white/10 bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        aria-label="Sơ đồ tổ chức ban"
        tabIndex={0}
      >
        <div className="mx-auto px-6 py-8" style={{ width: chartWidth, minWidth: "100%" }}>
          {hierarchy.map((level, levelIndex) => {
            const nextLevel = hierarchy[levelIndex + 1];
            const parentLevel = getRowLevel(level);
            const childLevel: AboutTeamLevel | undefined = nextLevel
              ? getRowLevel(nextLevel)
              : undefined;

            return (
              <div key={levelIndex} className="flex w-full flex-col items-center">
                <TeamOrgLevel members={level} nowrap />
                {nextLevel && childLevel !== undefined && (
                  <TeamOrgConnector
                    parentCount={level.length}
                    childCount={nextLevel.length}
                    parentSize={getAboutTeamCardSize(parentLevel)}
                    childSize={getAboutTeamCardSize(childLevel)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { computeChartWidth };
