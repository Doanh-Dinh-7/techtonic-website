import type { DepartmentColor } from "@/lib/content/types";

export const departmentColorStyles: Record<
  DepartmentColor,
  {
    bg: string;
    bgMuted: string;
    bgDeputy: string;
    border: string;
    borderDeputy: string;
    text: string;
    textDeputy: string;
    badge: string;
    dot: string;
    bookPage: string;
    bookSpine: string;
  }
> = {
  blue: {
    bg: "bg-blue-500",
    bgMuted: "bg-blue-500/10 dark:bg-blue-500/15",
    bgDeputy: "bg-blue-300/90",
    border: "border-blue-400/40",
    borderDeputy: "border-blue-400/50",
    text: "text-blue-700 dark:text-blue-300",
    textDeputy: "text-blue-950 dark:text-white",
    badge: "bg-blue-500/10 text-blue-700 border-blue-400/30 dark:bg-blue-500/20 dark:text-blue-200",
    dot: "bg-blue-500",
    bookPage: "from-blue-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-blue-900",
  },
  purple: {
    bg: "bg-purple-500",
    bgMuted: "bg-purple-500/10 dark:bg-purple-500/15",
    bgDeputy: "bg-purple-300/90",
    border: "border-purple-400/40",
    borderDeputy: "border-purple-400/50",
    text: "text-purple-700 dark:text-purple-300",
    textDeputy: "text-purple-950 dark:text-white",
    badge:
      "bg-purple-500/10 text-purple-700 border-purple-400/30 dark:bg-purple-500/20 dark:text-purple-200",
    dot: "bg-purple-500",
    bookPage: "from-purple-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-purple-900",
  },
  orange: {
    bg: "bg-orange-500",
    bgMuted: "bg-orange-500/10 dark:bg-orange-500/15",
    bgDeputy: "bg-orange-300/90",
    border: "border-orange-400/40",
    borderDeputy: "border-orange-400/50",
    text: "text-orange-700 dark:text-orange-300",
    textDeputy: "text-orange-950 dark:text-white",
    badge:
      "bg-orange-500/10 text-orange-700 border-orange-400/30 dark:bg-orange-500/20 dark:text-orange-200",
    dot: "bg-orange-500",
    bookPage: "from-orange-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-orange-900",
  },
  red: {
    bg: "bg-red-500",
    bgMuted: "bg-red-500/10 dark:bg-red-500/15",
    bgDeputy: "bg-red-300/90",
    border: "border-red-400/40",
    borderDeputy: "border-red-400/50",
    text: "text-red-700 dark:text-red-300",
    textDeputy: "text-red-950 dark:text-white",
    badge: "bg-red-500/10 text-red-700 border-red-400/30 dark:bg-red-500/20 dark:text-red-200",
    dot: "bg-red-500",
    bookPage: "from-red-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-red-900",
  },
  green: {
    bg: "bg-green-500",
    bgMuted: "bg-green-500/10 dark:bg-green-500/15",
    bgDeputy: "bg-green-300/90",
    border: "border-green-400/40",
    borderDeputy: "border-green-400/50",
    text: "text-green-700 dark:text-green-300",
    textDeputy: "text-green-950 dark:text-white",
    badge:
      "bg-green-500/10 text-green-700 border-green-400/30 dark:bg-green-500/20 dark:text-green-200",
    dot: "bg-green-500",
    bookPage: "from-green-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-green-900",
  },
  yellow: {
    bg: "bg-yellow-500",
    bgMuted: "bg-yellow-500/10 dark:bg-yellow-500/15",
    bgDeputy: "bg-yellow-200/95",
    border: "border-yellow-400/40",
    borderDeputy: "border-yellow-500/50",
    text: "text-yellow-700 dark:text-yellow-200",
    textDeputy: "text-yellow-950 dark:text-white",
    badge:
      "bg-yellow-500/10 text-yellow-700 border-yellow-400/30 dark:bg-yellow-500/20 dark:text-yellow-100",
    dot: "bg-yellow-500",
    bookPage: "from-yellow-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-yellow-900",
  },
  pink: {
    bg: "bg-pink-400",
    bgMuted: "bg-pink-400/10 dark:bg-pink-400/15",
    bgDeputy: "bg-pink-300/90",
    border: "border-pink-300/40",
    borderDeputy: "border-pink-400/50",
    text: "text-pink-700 dark:text-pink-200",
    textDeputy: "text-pink-950 dark:text-white",
    badge: "bg-pink-400/10 text-pink-700 border-pink-300/30 dark:bg-pink-400/20 dark:text-pink-100",
    dot: "bg-pink-400",
    bookPage: "from-pink-950/90 via-slate-900 to-slate-950",
    bookSpine: "bg-pink-900",
  },
};
