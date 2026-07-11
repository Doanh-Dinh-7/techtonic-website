"use client";

import { cn } from "@/shared/utils";

export type AboutIdentityPanelId = "vision" | "mission" | "values";

type AboutIdentityNavProps = {
  activeId: AboutIdentityPanelId;
  onSelect: (id: AboutIdentityPanelId) => void;
  items: { id: AboutIdentityPanelId; label: string }[];
};

export function AboutIdentityNav({ activeId, onSelect, items }: AboutIdentityNavProps) {
  return (
    <nav
      className="flex flex-row items-center justify-center gap-0 lg:flex-col lg:items-stretch lg:justify-start"
      aria-label="Tầm nhìn, sứ mệnh và giá trị cốt lõi"
    >
      {items.map((item, index) => {
        const isActive = activeId === item.id;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="flex items-center lg:w-full lg:flex-col">
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={item.label}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-2 py-3 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/70",
                isActive
                  ? "text-foreground dark:text-white"
                  : "text-muted-foreground hover:text-foreground dark:text-white/55 dark:hover:text-white/80",
                "lg:w-full"
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isActive
                    ? "border-neon-cyan bg-neon-cyan shadow-[0_0_14px_rgba(0,245,255,0.55)]"
                    : "border-muted-foreground/30 bg-transparent group-hover:border-neon-cyan/50 dark:border-white/30"
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "hidden font-utm-akashi text-sm font-normal lg:inline",
                  isActive ? "text-neon-cyan" : "text-muted-foreground dark:text-white/70"
                )}
              >
                {item.label}
              </span>
            </button>
            {!isLast && (
              <>
                <div
                  className="h-px w-10 bg-gradient-to-r from-neon-cyan/40 to-neon-purple/40 lg:hidden"
                  aria-hidden
                />
                <div
                  className="mx-5 hidden h-10 w-px bg-gradient-to-b from-neon-cyan/40 to-neon-purple/40 lg:mx-0 lg:block"
                  aria-hidden
                />
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
