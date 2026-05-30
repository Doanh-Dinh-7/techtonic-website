"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Brain, ChevronDown, Database, Globe, Server, Users } from "lucide-react";

import type { AcademicActivity, AcademicActivityIcon } from "@/lib/content/types";
import { GlassCard } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

import { accentIconWrap, accentTagWrap } from "../lib/accent-styles";

const iconMap: Record<AcademicActivityIcon, LucideIcon> = {
  database: Database,
  web: Globe,
  dns: Server,
  psychology: Brain,
  groups: Users,
};

type ActivityCardProps = {
  activity: AcademicActivity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[activity.icon];
  const hasMore = activity.description.length > activity.summary.length;

  return (
    <GlassCard
      glow={activity.accent === "violet" ? "purple" : activity.accent === "cyan" ? "cyan" : "none"}
      className={cn(
        "flex flex-col gap-4 rounded-xl p-6 transition duration-300",
        "hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]",
        activity.colSpan === "wide" && "md:col-span-2 lg:col-span-2"
      )}
    >
      <div
        className={cn(
          "mb-2 flex h-12 w-12 items-center justify-center rounded-lg",
          accentIconWrap[activity.accent]
        )}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-utm-akashi text-xl font-normal text-white">{activity.title}</h3>
      <p className="text-sm leading-relaxed text-white/68">{activity.summary}</p>
      {expanded && <p className="text-sm leading-relaxed text-white/55">{activity.description}</p>}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 self-start text-sm font-medium text-neon-cyan transition hover:text-neon-cyan/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-expanded={expanded}
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            aria-hidden
          />
        </button>
      )}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {activity.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className={cn(
              "rounded border px-2 py-1 font-mono text-[12px] uppercase tracking-wide",
              accentTagWrap[activity.accent]
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
