"use client";

import type { AboutTeamMember } from "@/lib/content/types";
import {
  getAboutTeamCardSize,
  getAboutTeamLevelAccent,
  type AboutTeamLevelAccent,
} from "@/features/about/lib/team-level";
import { GlassCard } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";
import { User } from "lucide-react";
import Image from "next/image";

type TeamMemberCardProps = {
  member: AboutTeamMember;
};

const accentStyles: Record<
  AboutTeamLevelAccent,
  { glow: "cyan" | "purple" | "magenta"; text: string }
> = {
  cyan: { glow: "cyan", text: "text-neon-cyan" },
  violet: { glow: "purple", text: "text-neon-purple" },
  magenta: { glow: "magenta", text: "text-neon-magenta" },
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const accent = getAboutTeamLevelAccent(member.level);
  const size = getAboutTeamCardSize(member.level);
  const { glow, text } = accentStyles[accent];
  const widthClass = size === "lg" ? "w-56" : "w-48";

  return (
    <GlassCard glow={glow} className={cn("group flex flex-col overflow-hidden", widthClass)}>
      <div className="relative aspect-square w-full overflow-hidden">
        {member.image && !member.isPlaceholder ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 dark:opacity-85"
            sizes="(max-width: 768px) 224px, 256px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary dark:bg-white/5">
            <User className="h-10 w-10 text-muted-foreground dark:text-white/30" aria-hidden />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent opacity-55" />
      </div>
      <div className="p-4 text-center">
        <h4
          className={cn(
            "font-utm-akashi text-base font-normal",
            member.isPlaceholder ? "text-muted-foreground dark:text-white/70" : text
          )}
        >
          {member.name}
        </h4>
        {member.role && (
          <p className="mt-1 text-sm text-muted-foreground dark:text-white/55">{member.role}</p>
        )}
      </div>
    </GlassCard>
  );
}
