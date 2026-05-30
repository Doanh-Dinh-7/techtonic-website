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
  dark: "bg-[#0a0a0a] text-white",
  light: "border-b border-gray-100 bg-gray-50 text-gray-900",
};

const toneBadgeClasses = {
  dark: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  light: "border-purple-300/40 bg-purple-100 text-purple-800",
};

const toneDescriptionClasses = {
  dark: "text-white/68",
  light: "text-gray-600",
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
                  tone === "dark" ? "text-white" : "text-gray-900"
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
