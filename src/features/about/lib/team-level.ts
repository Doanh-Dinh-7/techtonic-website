import type { AboutTeamLevel } from "@/lib/content/types";

export type AboutTeamLevelAccent = "cyan" | "violet" | "magenta";

export const ABOUT_TEAM_LEVEL_ACCENT: Record<AboutTeamLevel, AboutTeamLevelAccent> = {
  1: "cyan",
  2: "violet",
  3: "magenta",
};

export const ABOUT_TEAM_CARD_WIDTH: Record<AboutTeamLevel, number> = {
  1: 224,
  2: 192,
  3: 192,
};

export function getAboutTeamLevelAccent(level: AboutTeamLevel): AboutTeamLevelAccent {
  return ABOUT_TEAM_LEVEL_ACCENT[level];
}

export function getAboutTeamCardSize(level: AboutTeamLevel): "lg" | "md" {
  return level === 1 ? "lg" : "md";
}

export function getAboutTeamCardWidth(level: AboutTeamLevel): number {
  return ABOUT_TEAM_CARD_WIDTH[level];
}

export function getRowLevel(members: { level: AboutTeamLevel }[]): AboutTeamLevel {
  return members[0]?.level ?? 1;
}
