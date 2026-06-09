import type { AboutTeamMember } from "@/lib/content/types";

import { TeamMemberCard } from "./team-member-card";

type TeamOrgLevelProps = {
  members: AboutTeamMember[];
  accent?: "cyan" | "violet";
  size?: "lg" | "md";
};

export function TeamOrgLevel({ members, accent, size }: TeamOrgLevelProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {members.map((member) => (
        <TeamMemberCard
          key={`${member.name}-${member.role}`}
          member={member}
          accent={accent}
          size={size}
        />
      ))}
    </div>
  );
}
