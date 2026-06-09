"use client";

import type { AboutTeamMember } from "@/lib/content/types";
import { GlassCard } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";
import { User } from "lucide-react";
import Image from "next/image";

type TeamMemberCardProps = {
  member: AboutTeamMember;
  accent?: "cyan" | "violet";
  size?: "lg" | "md";
};

export function TeamMemberCard({ member, accent = "cyan", size = "lg" }: TeamMemberCardProps) {
  const isCyan = accent === "cyan";
  const widthClass = size === "lg" ? "w-56" : "w-48";

  return (
    <GlassCard
      glow={isCyan ? "cyan" : "purple"}
      className={cn("group flex flex-col overflow-hidden", widthClass)}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        {member.image && !member.isPlaceholder ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            sizes="(max-width: 768px) 224px, 256px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/5">
            <User className="h-10 w-10 text-white/30" aria-hidden />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
      </div>
      <div className="p-4 text-center">
        <h4
          className={cn(
            "font-utm-akashi text-base font-normal",
            member.isPlaceholder ? "text-white/70" : isCyan ? "text-neon-cyan" : "text-neon-purple"
          )}
        >
          {member.name}
        </h4>
        {member.role && <p className="mt-1 text-sm text-white/55">{member.role}</p>}
      </div>
    </GlassCard>
  );
}
