"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/shared/utils";

type DeferredMountProps = {
  children: ReactNode;
  className?: string;
  minHeight?: string;
  rootMargin?: string;
};

/** Mount children only when near the viewport — keeps heavy chunks off the initial route bundle. */
export function DeferredMount({
  children,
  className,
  minHeight = "20rem",
  rootMargin = "280px 0px",
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={cn("w-full", className)} style={!mounted ? { minHeight } : undefined}>
      {mounted ? children : null}
    </div>
  );
}
