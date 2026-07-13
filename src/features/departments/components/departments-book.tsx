"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { departmentBookPages } from "@/lib/content/departments";
import type { DepartmentBookPage } from "@/lib/content/types";
import {
  DepartmentsBookPageContent,
  type BookLayout,
} from "@/features/departments/components/departments-book-page-content";
import { departmentColorStyles } from "@/features/departments/lib/department-colors";
import { useReducedMotionPreference } from "@/hooks/use3d";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/shared/utils";

const TOTAL_PAGES = departmentBookPages.length;
const FLIP_DURATION = 0.65;

type FlipDirection = "next" | "prev";

export function DepartmentsBook() {
  const reducedMotion = useReducedMotionPreference();
  const isMobile = useIsMobile();
  const layout: BookLayout = isMobile ? "portrait" : "landscape";
  const isLandscape = layout === "landscape";

  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<FlipDirection | null>(null);
  const [flipTarget, setFlipTarget] = useState<number | null>(null);

  const canGoPrev = currentPage > 0 && !isFlipping;
  const canGoNext = currentPage < TOTAL_PAGES - 1 && !isFlipping;

  const startFlip = useCallback(
    (direction: FlipDirection) => {
      if (isFlipping) return;
      const target = direction === "next" ? currentPage + 1 : currentPage - 1;
      if (target < 0 || target >= TOTAL_PAGES) return;

      if (reducedMotion) {
        setCurrentPage(target);
        return;
      }

      setFlipDirection(direction);
      setFlipTarget(target);
      setIsFlipping(true);
    },
    [currentPage, isFlipping, reducedMotion]
  );

  const handleFlipComplete = useCallback(() => {
    if (flipTarget !== null) {
      setCurrentPage(flipTarget);
    }
    setIsFlipping(false);
    setFlipDirection(null);
    setFlipTarget(null);
  }, [flipTarget]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") startFlip("next");
      if (e.key === "ArrowLeft") startFlip("prev");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [startFlip]);

  const activePage = departmentBookPages[currentPage];
  const activeColors = departmentColorStyles[activePage.color];
  const pagePadding = isLandscape ? "pl-4" : "pl-3";

  return (
    <div className={cn("mx-auto w-full", isLandscape ? "max-w-5xl" : "max-w-3xl")}>
      <div className="mb-6 flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground dark:text-white/50">
          Trang {currentPage + 1} / {TOTAL_PAGES}
        </p>
        <div className="flex gap-2">
          {departmentBookPages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              disabled={isFlipping}
              onClick={() => {
                if (index === currentPage || isFlipping) return;
                if (reducedMotion || Math.abs(index - currentPage) !== 1) {
                  setCurrentPage(index);
                  return;
                }
                startFlip(index > currentPage ? "next" : "prev");
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentPage
                  ? cn("w-6", departmentColorStyles[page.color].dot)
                  : "w-2 bg-slate-400/50 hover:bg-slate-500/70 dark:bg-white/20 dark:hover:bg-white/40"
              )}
              aria-label={`Đi tới trang ${index + 1}: ${page.title}`}
            />
          ))}
        </div>
      </div>

      <div
        className={cn(
          "flex items-center justify-center gap-3",
          isLandscape ? "sm:gap-8" : "sm:gap-6"
        )}
      >
        <NavButton
          direction="prev"
          disabled={!canGoPrev}
          onClick={() => startFlip("prev")}
          label="Trang trước"
        />

        <div
          className={cn(
            "relative w-full",
            isLandscape ? "max-w-[min(100%,920px)]" : "max-w-[min(100%,520px)]"
          )}
          style={{ perspective: isLandscape ? "1800px" : "1200px" }}
        >
          <div
            className={cn(
              "pointer-events-none absolute z-0 bg-black/40 blur-md",
              isLandscape ? "bottom-6 left-4 top-6 w-10" : "bottom-4 left-3 top-4 w-6"
            )}
            aria-hidden
          />

          <div
            className={cn(
              "relative overflow-hidden border border-white/10 shadow-2xl shadow-black/50",
              "bg-gradient-to-br",
              isLandscape ? "aspect-[16/10] rounded-xl" : "aspect-[3/4] rounded-r-xl rounded-l-sm",
              activeColors.bookPage
            )}
          >
            <div
              className={cn(
                "absolute bottom-0 left-0 top-0 z-20",
                isLandscape ? "w-4 rounded-l-xl" : "w-3 rounded-l-sm",
                activeColors.bookSpine
              )}
              aria-hidden
            />

            {reducedMotion ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn("absolute inset-0", pagePadding)}
                >
                  <BookPageShell page={activePage} layout={layout} />
                </motion.div>
              </AnimatePresence>
            ) : isFlipping && flipTarget !== null && flipDirection ? (
              <FlipLayers
                direction={flipDirection}
                layout={layout}
                pagePadding={pagePadding}
                topPage={
                  flipDirection === "next"
                    ? departmentBookPages[currentPage]
                    : departmentBookPages[flipTarget]
                }
                bottomPage={
                  flipDirection === "next"
                    ? departmentBookPages[flipTarget]
                    : departmentBookPages[currentPage]
                }
                onComplete={handleFlipComplete}
              />
            ) : (
              <div className={cn("absolute inset-0", pagePadding)}>
                <BookPageShell page={activePage} layout={layout} />
              </div>
            )}
          </div>
        </div>

        <NavButton
          direction="next"
          disabled={!canGoNext}
          onClick={() => startFlip("next")}
          label="Trang sau"
        />
      </div>
    </div>
  );
}

function BookPageShell({ page, layout }: { page: DepartmentBookPage; layout: BookLayout }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-slate-950/60",
        layout === "landscape" ? "rounded-r-lg rounded-l-md" : "rounded-r-lg"
      )}
    >
      <DepartmentsBookPageContent page={page} layout={layout} className="h-full" />
    </div>
  );
}

type FlipLayersProps = {
  direction: FlipDirection;
  layout: BookLayout;
  pagePadding: string;
  topPage: DepartmentBookPage;
  bottomPage: DepartmentBookPage;
  onComplete: () => void;
};

function FlipLayers({
  direction,
  layout,
  pagePadding,
  topPage,
  bottomPage,
  onComplete,
}: FlipLayersProps) {
  const isNext = direction === "next";
  const initialRotate = isNext ? 0 : 180;
  const animateRotate = isNext ? -180 : 0;
  const isLandscape = layout === "landscape";

  return (
    <div className={cn("absolute inset-0", pagePadding)} style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0 z-0">
        <BookPageShell page={bottomPage} layout={layout} />
      </div>

      <motion.div
        className="absolute inset-0 z-10"
        style={{
          transformOrigin: isNext ? "left center" : "right center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
        initial={{ rotateY: initialRotate }}
        animate={{ rotateY: animateRotate }}
        transition={{ duration: FLIP_DURATION, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={onComplete}
      >
        <div className="relative h-full w-full">
          <BookPageShell page={topPage} layout={layout} />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              isLandscape ? "rounded-r-lg rounded-l-md" : "rounded-r-lg"
            )}
            style={{
              background: isNext
                ? "linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)"
                : "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
            }}
            aria-hidden
          />
        </div>
      </motion.div>
    </div>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors",
        "hover:border-cyan-500/50 hover:bg-cyan-50 hover:text-cyan-700",
        "dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:shadow-none",
        "dark:hover:border-neon-cyan/40 dark:hover:bg-neon-cyan/10 dark:hover:text-neon-cyan",
        "disabled:cursor-not-allowed disabled:opacity-30"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
