import * as React from "react";
import { cn } from "@/shared/utils";

type SectionShellProps = React.ComponentPropsWithoutRef<"section"> & {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  contentClassName?: string;
};

const toneSectionClasses = {
  dark: "bg-background text-foreground",
  light: "border-b border-border bg-secondary/45 text-foreground",
};

const toneBadgeClasses = {
  dark: "border-cyan-300/30 bg-cyan-300/10 text-cyan-700 dark:text-cyan-100",
  light: "border-primary/20 bg-primary/10 text-primary",
};

const toneDescriptionClasses = {
  dark: "text-muted-foreground",
  light: "text-muted-foreground",
};

export function SectionShell({
  align = "center",
  badge,
  children,
  className,
  contentClassName,
  description,
  title,
  tone = "dark",
  ...props
}: SectionShellProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8",
        toneSectionClasses[tone],
        tone === "dark" && "theme-tone-section",
        className
      )}
      {...props}
    >
      <div className={cn("relative z-10 mx-auto max-w-7xl", contentClassName)}>
        {(badge || title || description) && (
          <div className={cn("mb-12 max-w-3xl space-y-4", centered && "mx-auto text-center")}>
            {badge && (
              <div
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
                  toneBadgeClasses[tone]
                )}
              >
                {badge}
              </div>
            )}
            {title && (
              <h2
                className={cn(
                  "text-balance font-paris2024 text-3xl font-bold tracking-tight sm:text-5xl",
                  "text-foreground"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className={cn("text-base leading-7 sm:text-lg", toneDescriptionClasses[tone])}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
