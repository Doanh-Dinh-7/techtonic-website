import * as React from "react";
import { cn } from "@/shared/utils";

type SectionShellProps = React.ComponentPropsWithoutRef<"section"> & {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  contentClassName?: string;
};

export function SectionShell({
  align = "center",
  badge,
  children,
  className,
  contentClassName,
  description,
  title,
  ...props
}: SectionShellProps) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#0a0a0a] px-4 py-20 text-white sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      <div className={cn("relative z-10 mx-auto max-w-7xl", contentClassName)}>
        {(badge || title || description) && (
          <div className={cn("mb-12 max-w-3xl space-y-4", centered && "mx-auto text-center")}>
            {badge && (
              <div className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                {badge}
              </div>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base leading-7 text-white/68 sm:text-lg">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
