import type { AboutTeamMember } from "@/lib/content/types";
import { cn } from "@/shared/utils";

import { TeamMemberCard } from "./team-member-card";

type TeamOrgLevelProps = {
  members: AboutTeamMember[];
  nowrap?: boolean;
  cardGap?: number;
};

export function TeamOrgLevel({ members, nowrap, cardGap }: TeamOrgLevelProps) {
  return (
    <div
      className={cn("flex justify-center gap-6", nowrap && "flex-nowrap")}
      style={cardGap === undefined ? undefined : { gap: cardGap }}
    >
      {members.map((member, index) => (
        <TeamMemberCard
          key={`${member.name}-${member.role}-${member.level}-${index}`}
          member={member}
        />
      ))}
    </div>
  );
}
