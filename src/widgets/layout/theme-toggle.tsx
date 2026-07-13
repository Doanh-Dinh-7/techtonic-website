"use client";

import { useEffect, useMemo, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

const themeLabels = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System theme",
} as const;

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (theme ?? "system") : "system";
  const isDark = mounted && resolvedTheme === "dark";
  const label = useMemo(() => {
    if (!mounted) return "Theme";
    return isDark ? "Switch to light mode" : "Switch to dark mode";
  }, [isDark, mounted]);

  const Icon = !mounted ? Monitor : activeTheme === "system" ? Monitor : isDark ? Moon : Sun;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={label}
            title={label}
            className="h-10 w-10 shrink-0 border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            <Icon className="h-4 w-4" aria-hidden />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{mounted ? themeLabels[activeTheme as keyof typeof themeLabels] : "Theme"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
