"use client";

import type { ReactNode } from "react";
import { Info } from "lucide-react";

import type { OrgChartNode } from "@/lib/content/types";
import { departmentColorStyles } from "@/features/departments/lib/department-colors";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shared/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/utils";

type OrgChartInfoNodeProps = {
  node: OrgChartNode;
  className?: string;
  children?: ReactNode;
  dashed?: boolean;
  compact?: boolean;
  /** Chỉ bật cho cấp ban — vị trí trong ban không hiển thị info */
  showInfo?: boolean;
};

export function OrgChartInfoNode({
  node,
  className,
  children,
  dashed = false,
  compact = false,
  showInfo = false,
}: OrgChartInfoNodeProps) {
  const colors = node.color ? departmentColorStyles[node.color] : null;

  const infoButton = (
    <button
      type="button"
      className={cn(
        "absolute right-1.5 top-1.5 z-10 rounded-full p-0.5",
        "text-white/50 transition-colors hover:bg-white/10 hover:text-white/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50"
      )}
      aria-label={`Thông tin về ${node.label}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Info className="h-3.5 w-3.5" />
    </button>
  );

  const description = (
    <p className="text-sm leading-relaxed text-white/80">{node.shortDescription}</p>
  );

  return (
    <div
      className={cn(
        "relative text-center",
        showInfo
          ? "border-0 bg-transparent px-2 py-1 shadow-none"
          : cn(
              "rounded-lg border shadow-sm",
              dashed ? "border-dashed" : "border-solid",
              colors ? cn(colors.bgMuted, colors.border) : "border-white/15 bg-white/5",
              compact ? "px-2 py-2 text-xs" : "px-3 py-2.5 text-sm",
              colors && !/\btext-/.test(className ?? "") && "text-white/90"
            ),
        className
      )}
    >
      {showInfo && (
        <>
          <div className="hidden sm:block">
            <HoverCard openDelay={120} closeDelay={80}>
              <HoverCardTrigger asChild>{infoButton}</HoverCardTrigger>
              <HoverCardContent
                side="top"
                className="max-w-xs border-white/10 bg-slate-900/95 text-white"
              >
                <p className="mb-1 font-semibold text-white">{node.label}</p>
                {description}
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger asChild>{infoButton}</PopoverTrigger>
              <PopoverContent
                side="top"
                className="max-w-xs border-white/10 bg-slate-900/95 text-white"
              >
                <p className="mb-1 font-semibold text-white">{node.label}</p>
                {description}
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}

      <div
        className={cn(
          "font-medium",
          showInfo
            ? cn(
                "font-semibold",
                compact ? "text-sm sm:text-base" : "text-base sm:text-lg",
                colors?.text ?? "text-white/90"
              )
            : compact && "text-[11px] leading-tight"
        )}
      >
        {children ?? node.label}
      </div>
    </div>
  );
}
