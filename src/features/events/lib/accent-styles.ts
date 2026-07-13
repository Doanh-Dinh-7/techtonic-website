import type { ActivityAccent } from "@/lib/content/types";

export const accentIconWrap: Record<ActivityAccent, string> = {
  cyan: "bg-neon-cyan/10 text-neon-cyan",
  violet: "bg-neon-purple/10 text-neon-purple",
  blue: "bg-electric-blue/10 text-electric-blue",
  emerald: "bg-emerald-500/10 text-emerald-400",
  amber: "bg-amber-500/10 text-amber-400",
  pink: "bg-pink-500/10 text-pink-400",
  orange: "bg-orange-500/10 text-orange-400",
};

/** @deprecated Timeline dùng accentTitle / accentLabelMuted */
export const accentLabel: Record<ActivityAccent, string> = {
  cyan: "text-neon-cyan",
  violet: "text-neon-purple",
  blue: "text-electric-blue",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  pink: "text-pink-400",
  orange: "text-orange-400",
};

/** Tầng 1 — order badge & chấm timeline (đậm nhất, có glow) */
export const accentOrder: Record<ActivityAccent, string> = {
  cyan: "border-cyan-500/70 bg-cyan-100 text-cyan-800 shadow-[0_0_14px_rgba(14,116,144,0.18)] dark:border-neon-cyan/70 dark:bg-neon-cyan/25 dark:text-neon-cyan dark:shadow-[0_0_14px_rgba(0,245,255,0.45)]",
  violet:
    "border-purple-500/70 bg-purple-100 text-purple-800 shadow-[0_0_14px_rgba(126,34,206,0.18)] dark:border-neon-purple/70 dark:bg-neon-purple/25 dark:text-neon-purple dark:shadow-[0_0_14px_rgba(168,85,247,0.45)]",
  blue: "border-blue-500/70 bg-blue-100 text-blue-800 shadow-[0_0_14px_rgba(37,99,235,0.18)] dark:border-electric-blue/70 dark:bg-electric-blue/25 dark:text-electric-blue dark:shadow-[0_0_14px_rgba(59,130,246,0.45)]",
  emerald:
    "border-emerald-500/70 bg-emerald-100 text-emerald-800 shadow-[0_0_14px_rgba(4,120,87,0.18)] dark:border-emerald-400/70 dark:bg-emerald-500/25 dark:text-emerald-400 dark:shadow-[0_0_14px_rgba(52,211,153,0.4)]",
  amber:
    "border-amber-500/70 bg-amber-100 text-amber-800 shadow-[0_0_14px_rgba(180,83,9,0.18)] dark:border-amber-400/70 dark:bg-amber-500/25 dark:text-amber-400 dark:shadow-[0_0_14px_rgba(251,191,36,0.4)]",
  pink: "border-pink-500/70 bg-pink-100 text-pink-800 shadow-[0_0_14px_rgba(190,24,93,0.18)] dark:border-pink-400/70 dark:bg-pink-500/25 dark:text-pink-400 dark:shadow-[0_0_14px_rgba(248,113,113,0.4)]",
  orange:
    "border-orange-500/70 bg-orange-100 text-orange-800 shadow-[0_0_14px_rgba(194,65,12,0.18)] dark:border-orange-400/70 dark:bg-orange-500/25 dark:text-orange-400 dark:shadow-[0_0_14px_rgba(255,165,0,0.4)]",
};

/** Tầng 2 — tên chương trình (nổi bật) */
export const accentTitle: Record<ActivityAccent, string> = {
  cyan: "text-neon-cyan drop-shadow-[0_0_12px_rgba(0,245,255,0.35)]",
  violet: "text-neon-purple drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]",
  blue: "text-electric-blue drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]",
  emerald: "text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]",
  amber: "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]",
  pink: "text-pink-400 drop-shadow-[0_0_12px_rgba(248,113,113,0.35)]",
  orange: "text-orange-400 drop-shadow-[0_0_12px_rgba(255,165,0,0.35)]",
};

/** Tầng 3 — nhãn loại sự kiện (nhạt, cùng hue) */
export const accentLabelMuted: Record<ActivityAccent, string> = {
  cyan: "text-neon-cyan/55",
  violet: "text-neon-purple/55",
  blue: "text-electric-blue/55",
  emerald: "text-emerald-400/55",
  amber: "text-amber-400/55",
  pink: "text-pink-400/55",
  orange: "text-orange-400/55",
};

export const accentTagWrap: Record<ActivityAccent, string> = {
  cyan: "bg-cyan-500/10 text-cyan-700 border-cyan-500/20 dark:bg-white/5 dark:text-white/70 dark:border-white/10",
  violet: "bg-neon-purple/10 text-neon-purple border-neon-purple/20",
  blue: "bg-electric-blue/10 text-electric-blue border-electric-blue/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};
