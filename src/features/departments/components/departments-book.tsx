"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
/** Thời gian một lần lật trang (giây). */
const FLIP_DURATION = 0.9;
/** easeInOutCubic – chậm lúc nhấc trang, nhanh ở giữa, chậm lại khi trang hạ xuống. */
const FLIP_EASE = [0.645, 0.045, 0.355, 1] as const;
const SWIPE_THRESHOLD = 50;

type FlipDirection = "next" | "prev";

type FlipState = {
  direction: FlipDirection;
  from: number;
  to: number;
};

const clampPage = (index: number) => Math.min(Math.max(index, 0), TOTAL_PAGES - 1);

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function DepartmentsBook() {
  const reducedMotion = useReducedMotionPreference();
  const isMobile = useIsMobile();
  const layout: BookLayout = isMobile ? "portrait" : "landscape";
  const isLandscape = layout === "landscape";

  const [currentPage, setCurrentPage] = useState(0);
  const [flip, setFlip] = useState<FlipState | null>(null);
  /** Trang người dùng yêu cầu trong lúc đang lật – sẽ lật tiếp ngay khi xong. */
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  /** Trang "đích" mà sách sẽ dừng lại (tính cả lần lật đang chạy và lần lật đang chờ). */
  const destinationPage = pendingPage ?? flip?.to ?? currentPage;

  const goTo = useCallback(
    (rawTarget: number) => {
      const target = clampPage(rawTarget);

      if (flip) {
        setPendingPage(target === flip.to ? null : target);
        return;
      }
      if (target === currentPage) return;

      if (reducedMotion) {
        setCurrentPage(target);
        return;
      }

      setFlip({
        direction: target > currentPage ? "next" : "prev",
        from: currentPage,
        to: target,
      });
    },
    [currentPage, flip, reducedMotion]
  );

  const goNext = useCallback(() => goTo(destinationPage + 1), [goTo, destinationPage]);
  const goPrev = useCallback(() => goTo(destinationPage - 1), [goTo, destinationPage]);

  const handleFlipComplete = useCallback(() => {
    if (!flip) return;
    const landed = flip.to;
    setCurrentPage(landed);

    // Lật tiếp ngay nếu người dùng đã bấm thêm trong lúc đang lật.
    if (pendingPage !== null && pendingPage !== landed) {
      setFlip({
        direction: pendingPage > landed ? "next" : "prev",
        from: landed,
        to: pendingPage,
      });
    } else {
      setFlip(null);
    }
    setPendingPage(null);
  }, [flip, pendingPage]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  // Trang nằm cố định bên dưới. Khi lật tới: trang đích nằm dưới, trang hiện tại lật đi.
  // Khi lật lui: trang hiện tại nằm dưới, trang đích lật về đè lên.
  const basePageIndex = flip ? (flip.direction === "next" ? flip.to : flip.from) : currentPage;
  const leafPageIndex = flip ? (flip.direction === "next" ? flip.from : flip.to) : null;
  const basePage = departmentBookPages[basePageIndex];
  const baseColors = departmentColorStyles[basePage.color];
  const pagePadding = isLandscape ? "pl-4" : "pl-3";
  const indicatorPage = flip ? flip.to : currentPage;

  return (
    <div className={cn("mx-auto w-full", isLandscape ? "max-w-5xl" : "max-w-3xl")}>
      <div className="mb-6 flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground dark:text-white/50" aria-live="polite">
          Trang {indicatorPage + 1} / {TOTAL_PAGES}
        </p>
        <div className="flex gap-2">
          {departmentBookPages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                index === indicatorPage
                  ? cn("w-6", departmentColorStyles[page.color].dot)
                  : "w-2 bg-slate-400/50 hover:bg-slate-500/70 dark:bg-white/20 dark:hover:bg-white/40"
              )}
              aria-label={`Đi tới trang ${index + 1}: ${page.title}`}
              aria-current={index === indicatorPage ? "page" : undefined}
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
          disabled={destinationPage <= 0}
          onClick={goPrev}
          label="Trang trước"
        />

        <div
          className={cn(
            "relative w-full",
            isLandscape ? "max-w-[min(100%,920px)]" : "max-w-[min(100%,520px)]"
          )}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
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
              isLandscape ? "aspect-[16/10] rounded-xl" : "aspect-[3/4] rounded-l-sm rounded-r-xl",
              baseColors.bookPage
            )}
          >
            <div
              className={cn(
                "absolute bottom-0 left-0 top-0 z-20 transition-colors duration-700",
                isLandscape ? "w-4 rounded-l-xl" : "w-3 rounded-l-sm",
                baseColors.bookSpine
              )}
              aria-hidden
            />

            {reducedMotion ? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn("absolute inset-0", pagePadding)}
                >
                  <BookPageShell page={basePage} layout={layout} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className={cn("absolute inset-0", pagePadding)}>
                <BookPageShell key={basePage.id} page={basePage} layout={layout} />
              </div>
            )}
          </div>

          {/* Lớp lật trang nằm ngoài khung overflow-hidden để giữ được không gian 3D. */}
          {flip && leafPageIndex !== null && (
            <FlipOverlay
              key={`${flip.from}-${flip.to}`}
              direction={flip.direction}
              page={departmentBookPages[leafPageIndex]}
              layout={layout}
              pagePadding={pagePadding}
              onComplete={handleFlipComplete}
            />
          )}
        </div>

        <NavButton
          direction="next"
          disabled={destinationPage >= TOTAL_PAGES - 1}
          onClick={goNext}
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
        layout === "landscape" ? "rounded-l-md rounded-r-lg" : "rounded-r-lg"
      )}
    >
      <DepartmentsBookPageContent page={page} layout={layout} className="h-full" />
    </div>
  );
}

type FlipOverlayProps = {
  direction: FlipDirection;
  page: DepartmentBookPage;
  layout: BookLayout;
  pagePadding: string;
  onComplete: () => void;
};

/** Tổng độ cong tối đa (độ) giữa gáy và mép ngoài của tờ giấy, đạt được giữa lần lật. */
const MAX_CURL = 70;

const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Tờ giấy mềm, bản lề ở gáy sách (cạnh trái).
 *
 * Tờ giấy được chia thành nhiều dải dọc lồng nhau: dải đầu quay quanh gáy theo góc
 * `base`, mỗi dải con quay thêm một góc `bend` quanh mép trái của nó. Nhờ vậy mép ngoài
 * luôn đi trước phần gần gáy → tờ giấy cong như giấy thật. `bend` = sin(π·p) nên giấy
 * phẳng lúc bắt đầu/kết thúc và cong nhất ở giữa.
 *  - next: base 0° → -180° (tờ hiện tại lật qua gáy sang trái)
 *  - prev: base -180° → 0° (tờ trước lật về, phủ lên trang hiện tại)
 */
function FlipOverlay({ direction, page, layout, pagePadding, onComplete }: FlipOverlayProps) {
  const isLandscape = layout === "landscape";
  const stripCount = isLandscape ? 14 : 10;
  const isNext = direction === "next";

  const progress = useMotionValue(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: FLIP_DURATION,
      ease: FLIP_EASE,
      onComplete: () => onCompleteRef.current(),
    });
    return () => controls.stop();
  }, [progress]);

  const base = useTransform(progress, (p) => (isNext ? -180 * p : -180 * (1 - p)));
  // Mép ngoài đi trước: lật tới thì cong về -, lật lui thì cong về +.
  const bend = useTransform(progress, (p) => {
    // Góc còn lại tới vị trí đích – không để mép giấy cong vượt qua mặt phẳng trang.
    const remaining = 180 * (1 - p);
    const curl = Math.min(Math.sin(Math.PI * p) * MAX_CURL, remaining);
    return ((isNext ? -1 : 1) * curl) / (stripCount - 1);
  });

  // Tờ giấy mờ dần khi đã nằm hẳn bên trái gáy (ngoài khung sách).
  const leafOpacity = useTransform(base, [-180, -168, -125, 0], [0, 0, 1, 1]);
  // Bóng của tờ giấy đổ lên trang bên dưới, co dần về phía gáy theo hình chiếu cos(θ).
  const castOpacity = useTransform(base, [-180, -100, -35, 0], [0, 0.2, 0.55, 0]);
  const castWidth = useTransform(base, (deg) => {
    const projected = Math.max(Math.cos(toRad(deg)), 0);
    return `${Math.min(projected * 100 + 6, 100)}%`;
  });

  const faceRadius = isLandscape ? "rounded-l-md rounded-r-lg" : "rounded-r-lg";
  const colors = departmentColorStyles[page.color];

  return (
    <div className={cn("pointer-events-none absolute inset-px z-30", pagePadding)} aria-hidden>
      <div className="relative h-full w-full">
        <motion.div
          className={cn("absolute inset-y-0 left-0", faceRadius)}
          style={{
            width: castWidth,
            opacity: castOpacity,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* opacity đặt ở lớp perspective (không preserve-3d) để không làm phẳng tờ giấy. */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: leafOpacity,
            perspective: isLandscape ? 2600 : 1600,
            perspectiveOrigin: "0% 50%",
          }}
        >
          <LeafStrip
            index={0}
            count={stripCount}
            base={base}
            bend={bend}
            page={page}
            layout={layout}
            backGradient={colors.bookPage}
          />
        </motion.div>
      </div>
    </div>
  );
}

type LeafStripProps = {
  index: number;
  count: number;
  base: MotionValue<number>;
  bend: MotionValue<number>;
  page: DepartmentBookPage;
  layout: BookLayout;
  backGradient: string;
};

/** Một dải dọc của tờ giấy; dải con được lồng bên trong và nối tiếp ở mép phải. */
function LeafStrip({ index, count, base, bend, page, layout, backGradient }: LeafStripProps) {
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const isLandscape = layout === "landscape";

  // Dải đầu quay theo base quanh gáy, các dải sau chỉ quay thêm phần cong.
  const rotateY = isFirst ? base : bend;

  // Góc tuyệt đối của dải này so với mặt phẳng trang → dùng để đổ bóng / ánh sáng.
  const absoluteAngle = useTransform([base, bend], ([b, k]: number[]) => b + index * k);
  const shade = useTransform(absoluteAngle, (deg) => {
    const facing = Math.abs(Math.cos(toRad(deg)));
    return (1 - facing) * 0.65;
  });
  // Vệt sáng chạy dọc chỗ giấy cong khi dải nghiêng khoảng 60–80°.
  const gloss = useTransform(absoluteAngle, (deg) => {
    const a = Math.abs(deg) > 90 ? 180 - Math.abs(deg) : Math.abs(deg);
    return Math.max(0, 1 - Math.abs(a - 68) / 16) * 0.16;
  });

  // Nội dung đầy đủ của trang, dịch sang trái để dải này chỉ hiện đúng lát cắt của nó.
  const sliceStyle = {
    width: `${count * 100}%`,
    left: `${-index * 100}%`,
  };

  return (
    <motion.div
      className="absolute inset-y-0"
      style={{
        left: isFirst ? 0 : "100%",
        width: isFirst ? `${100 / count}%` : "100%",
        rotateY,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Mặt trước: lát cắt của trang (rộng thêm 1px để không lộ khe giữa các dải) */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 overflow-hidden bg-slate-950",
          isFirst && isLandscape && "rounded-l-md",
          isLast && "rounded-r-lg"
        )}
        style={{
          width: isLast ? "100%" : "calc(100% + 1px)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div
          className={cn("absolute inset-y-0 bg-gradient-to-br", backGradient)}
          style={sliceStyle}
        >
          <BookPageShell page={page} layout={layout} />
        </div>
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
        <motion.div className="absolute inset-0 bg-white" style={{ opacity: gloss }} />
      </div>

      {/* Mặt sau: giấy trơn */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 overflow-hidden bg-slate-950",
          isFirst && isLandscape && "rounded-r-md",
          isLast && "rounded-l-lg"
        )}
        style={{
          width: isLast ? "100%" : "calc(100% + 1px)",
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div
          className={cn("absolute inset-y-0 bg-gradient-to-bl", backGradient)}
          style={{ width: `${count * 100}%`, right: `${-index * 100}%` }}
        />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
        <motion.div className="absolute inset-0 bg-white" style={{ opacity: gloss }} />
      </div>

      {!isLast && (
        <LeafStrip
          index={index + 1}
          count={count}
          base={base}
          bend={bend}
          page={page}
          layout={layout}
          backGradient={backGradient}
        />
      )}
    </motion.div>
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
