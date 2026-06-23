import type { AboutTeamMember } from "@/lib/content/types";
import { cn } from "@/shared/utils";

import { TeamMemberCard } from "./team-member-card";

type TeamOrgLevelProps = {
  members: AboutTeamMember[];
  nowrap?: boolean;
};

export function TeamOrgLevel({ members, nowrap }: TeamOrgLevelProps) {
  return (
    <div className={cn("flex justify-center gap-6", nowrap && "flex-nowrap")}>
      {members.map((member) => (
        <TeamMemberCard key={`${member.name}-${member.role}-${member.level}`} member={member} />
      ))}
    </div>
  );
}
