"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/shared/utils";

const CARD_WIDTH = { lg: 224, md: 192 } as const;
const CARD_GAP = 24;
const STEM_HEIGHT = 24;
const BRANCH_HEIGHT = 24;
const STROKE_WIDTH = 2;

type TeamOrgConnectorProps = {
  parentCount: number;
  childCount: number;
  parentSize?: "lg" | "md";
  childSize?: "lg" | "md";
  className?: string;
};

function computeCenters(count: number, cardWidth: number, containerWidth: number): number[] {
  if (count <= 0 || containerWidth <= 0) return [];

  const rowWidth = count * cardWidth + Math.max(0, count - 1) * CARD_GAP;
  const startX = Math.max(0, (containerWidth - rowWidth) / 2);

  return Array.from(
    { length: count },
    (_, index) => startX + index * (cardWidth + CARD_GAP) + cardWidth / 2
  );
}

function buildConnectorPaths(
  parentCenters: number[],
  childCenters: number[],
  height: number
): string[] {
  if (parentCenters.length === 0 || childCenters.length === 0) return [];

  const midY = STEM_HEIGHT;
  const parentX =
    parentCenters.length === 1
      ? parentCenters[0]
      : (parentCenters[0] + parentCenters[parentCenters.length - 1]) / 2;

  const paths: string[] = [];

  if (childCenters.length === 1) {
    const childX = childCenters[0];
    if (Math.abs(parentX - childX) < 1) {
      paths.push(`M ${parentX} 0 L ${parentX} ${height}`);
    } else {
      paths.push(`M ${parentX} 0 L ${parentX} ${midY} L ${childX} ${midY} L ${childX} ${height}`);
    }
    return paths;
  }

  const busLeft = childCenters[0];
  const busRight = childCenters[childCenters.length - 1];

  paths.push(`M ${parentX} 0 L ${parentX} ${midY}`);
  paths.push(`M ${busLeft} ${midY} L ${busRight} ${midY}`);

  for (const childX of childCenters) {
    paths.push(`M ${childX} ${midY} L ${childX} ${height}`);
  }

  return paths;
}

function buildJunctionPoints(
  parentCenters: number[],
  childCenters: number[]
): { x: number; y: number }[] {
  if (parentCenters.length === 0 || childCenters.length === 0) return [];

  const midY = STEM_HEIGHT;
  const parentX =
    parentCenters.length === 1
      ? parentCenters[0]
      : (parentCenters[0] + parentCenters[parentCenters.length - 1]) / 2;

  const points: { x: number; y: number }[] = [{ x: parentX, y: midY }];

  if (childCenters.length === 1) {
    if (Math.abs(parentX - childCenters[0]) > 1) {
      points.push({ x: childCenters[0], y: midY });
    }
    return points;
  }

  for (const childX of childCenters) {
    points.push({ x: childX, y: midY });
  }

  return points;
}

export function TeamOrgConnector({
  parentCount,
  childCount,
  parentSize = "lg",
  childSize = "md",
  className,
}: TeamOrgConnectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const gradientId = useId().replace(/:/g, "");

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => setContainerWidth(element.getBoundingClientRect().width);

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, [parentCount, childCount]);

  const parentCardWidth = CARD_WIDTH[parentSize];
  const childCardWidth = CARD_WIDTH[childSize];
  const svgHeight = STEM_HEIGHT + BRANCH_HEIGHT;

  const parentCenters = useMemo(
    () => computeCenters(parentCount, parentCardWidth, containerWidth),
    [parentCount, parentCardWidth, containerWidth]
  );

  const childCenters = useMemo(
    () => computeCenters(childCount, childCardWidth, containerWidth),
    [childCount, childCardWidth, containerWidth]
  );

  const rowWidth = childCount * childCardWidth + Math.max(0, childCount - 1) * CARD_GAP;
  const useSimpleFallback = containerWidth > 0 && rowWidth > containerWidth;

  const paths = useMemo(
    () => buildConnectorPaths(parentCenters, childCenters, svgHeight),
    [parentCenters, childCenters, svgHeight]
  );

  const junctions = useMemo(
    () => buildJunctionPoints(parentCenters, childCenters),
    [parentCenters, childCenters]
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: svgHeight }}
      aria-hidden
    >
      {useSimpleFallback ? (
        <div className="flex h-full justify-center">
          <div className="h-full w-0.5 rounded-full bg-gradient-to-b from-neon-cyan/70 via-neon-cyan/45 to-neon-purple/70 shadow-[0_0_10px_rgba(0,245,255,0.35)]" />
        </div>
      ) : containerWidth > 0 ? (
        <svg
          className="h-full w-full overflow-visible"
          width={containerWidth}
          height={svgHeight}
          viewBox={`0 0 ${containerWidth} ${svgHeight}`}
        >
          <defs>
            <linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1={containerWidth / 2}
              y1={0}
              x2={containerWidth / 2}
              y2={svgHeight}
            >
              <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.85} />
              <stop offset="50%" stopColor="#00f5ff" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.85} />
            </linearGradient>
          </defs>

          {paths.map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {junctions.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={3}
              fill="#00f5ff"
              fillOpacity={0.9}
              stroke="#a855f7"
              strokeOpacity={0.45}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}
