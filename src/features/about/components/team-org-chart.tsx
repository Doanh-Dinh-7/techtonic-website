"use client";

import { useEffect, useRef } from "react";

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

function computeLevelWidth(members: AboutTeamMember[], cardGap: number): number {
  if (members.length === 0) return 0;

  const cardWidth = getAboutTeamCardWidth(getRowLevel(members));
  return members.length * cardWidth + Math.max(0, members.length - 1) * cardGap;
}

function computeChartWidth(hierarchy: AboutTeamMember[][], cardGap = CARD_GAP): number {
  if (hierarchy.length === 0) return 320;

  const levelWidths = hierarchy.map((members) => computeLevelWidth(members, cardGap));
  return Math.max(...levelWidths, 280) + CHART_PADDING_X * 2;
}

type TeamOrgChartProps = {
  hierarchy: AboutTeamMember[][];
  cardGap?: number;
  isActive?: boolean;
};

export function TeamOrgChart({
  hierarchy,
  cardGap = CARD_GAP,
  isActive = true,
}: TeamOrgChartProps) {
  const chartWidth = computeChartWidth(hierarchy, cardGap);
  const scrollRef = useShiftWheelHorizontalScroll<HTMLDivElement>();
  const hasCenteredRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasCenteredRef.current) return;

    const frameId = window.requestAnimationFrame(() => {
      const element = scrollRef.current;
      if (!element) return;

      element.scrollLeft = Math.max(0, (element.scrollWidth - element.clientWidth) / 2);
      hasCenteredRef.current = true;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [chartWidth, isActive, scrollRef]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="about-team-org-scroll max-h-[min(160vh)] overflow-auto overscroll-contain rounded-2xl border border-border bg-card/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:border-white/10 dark:bg-white/[0.02] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
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
                <TeamOrgLevel
                  members={level}
                  nowrap
                  cardGap={cardGap === CARD_GAP ? undefined : cardGap}
                />
                {nextLevel && childLevel !== undefined && (
                  <TeamOrgConnector
                    parentCount={level.length}
                    childCount={nextLevel.length}
                    parentSize={getAboutTeamCardSize(parentLevel)}
                    childSize={getAboutTeamCardSize(childLevel)}
                    cardGap={cardGap}
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
