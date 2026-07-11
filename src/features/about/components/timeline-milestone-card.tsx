import type { TimelineEntry } from "@/lib/content/types";
import { GlassCard } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

type TimelineMilestoneCardProps = {
  entry: TimelineEntry;
  className?: string;
};

export function TimelineMilestoneCard({ entry, className }: TimelineMilestoneCardProps) {
  const isCyan = entry.accent !== "violet";

  return (
    <article
      className={cn(
        "group relative flex w-64 shrink-0 flex-col items-center",
        entry.offset === "high" ? "mb-32" : "mb-8",
        className
      )}
    >
      <GlassCard
        glow={isCyan ? "cyan" : "purple"}
        className="w-full p-5 transition-colors hover:border-neon-cyan/40"
      >
        <h3 className="mb-2 font-utm-akashi text-base font-normal">
          <span className={isCyan ? "text-neon-cyan" : "text-neon-purple"}>{entry.dateLabel}:</span>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/68">
          {entry.description}
        </p>
      </GlassCard>
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 border-l border-dashed opacity-50 transition-opacity group-hover:opacity-100",
          isCyan ? "border-neon-cyan/50" : "border-neon-purple/50",
          entry.offset === "high" ? "-bottom-32 h-32" : "-bottom-8 h-8"
        )}
        aria-hidden
      />
    </article>
  );
}
