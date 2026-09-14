"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useReducedMotionPreference } from "@/hooks/use3d";
import { homeTestimonials } from "@/lib/content/home";
import { GlassCard, GradientOrb, SectionShell } from "@/shared/ui-v2";

const AUTOPLAY_DELAY_MS = 3000;

const navigationButtonClassName =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

function getDynamicRole(year: number) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const academicYearDifference = currentMonth >= 8 ? currentYear - year : currentYear - 1 - year;

  if (academicYearDifference >= 4) return "Cựu sinh viên";
  if (academicYearDifference < 1) return "Tân sinh viên";

  return `Sinh viên năm ${academicYearDifference + 1}`;
}

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const isAutoplaying =
    !reducedMotion && !isHoverPaused && !isManuallyPaused && homeTestimonials.length > 1;

  useEffect(() => {
    if (!isAutoplaying) return;

    const timeout = setTimeout(() => {
      setCurrentTestimonial((previous) => (previous + 1) % homeTestimonials.length);
    }, AUTOPLAY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [currentTestimonial, isAutoplaying]);

  const navigate = (direction: number) => {
    setCurrentTestimonial(
      (previous) => (previous + direction + homeTestimonials.length) % homeTestimonials.length
    );
  };

  return (
    <SectionShell
      id="testimonials"
      badge="Cảm nhận"
      title="Thành viên nói gì về chúng tôi"
      contentClassName="max-w-4xl"
    >
      <GradientOrb className="left-1/2 top-8 -translate-x-1/2" color="magenta" />

      <GlassCard
        glow="purple"
        role="region"
        aria-roledescription="trình chiếu"
        aria-label="Cảm nhận của thành viên"
        className="p-6 sm:p-8 motion-reduce:transition-none"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
      >
        {/* Adapted from https://ui.aceternity.com/components/animated-testimonials. */}
        <div className="relative grid min-w-0 items-start gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="px-4 py-6">
            <div className="relative isolate mx-auto aspect-square w-full max-w-xs [perspective:1000px]">
              {homeTestimonials.map((testimonial, index) => {
                const isActive = index === currentTestimonial;

                return (
                  <motion.div
                    key={testimonial.id}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : reducedMotion ? 0 : 0.65,
                      scale: isActive || reducedMotion ? 1 : 0.94,
                      rotate: isActive || reducedMotion ? 0 : index % 2 === 0 ? -8 : 8,
                      z: isActive || reducedMotion ? 0 : -40,
                      y: isActive && !reducedMotion ? [0, -24, 0] : 0,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeInOut" }}
                    style={{ zIndex: isActive ? homeTestimonials.length : index }}
                    className="absolute inset-0 flex origin-bottom items-center justify-center rounded-3xl border border-[var(--v2-glass-border)] bg-background p-6 shadow-xl"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src={testimonial.image}
                        alt={`Ảnh của ${testimonial.name}`}
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <div className="grid" aria-live={isAutoplaying ? "off" : "polite"} aria-atomic="true">
              {homeTestimonials.map((testimonial, index) => {
                const isActive = index === currentTestimonial;

                return (
                  <motion.div
                    key={testimonial.id}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: reducedMotion || isActive ? 0 : 16,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeInOut" }}
                    style={{
                      gridArea: "1 / 1",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    className="min-w-0 break-words"
                  >
                    <h3 className="font-paris2024 text-2xl font-black text-foreground sm:text-3xl">
                      {testimonial.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-white/65">
                      {`${getDynamicRole(testimonial.year)} - ${testimonial.role}`}
                    </p>
                    <blockquote className="mt-6 text-base leading-7 text-muted-foreground dark:text-white/75">
                      <span aria-hidden="true">&ldquo;</span>
                      {testimonial.text}
                      <span aria-hidden="true">&rdquo;</span>
                    </blockquote>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-label="Cảm nhận trước"
                onClick={() => navigate(-1)}
                className={navigationButtonClassName}
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Cảm nhận tiếp theo"
                onClick={() => navigate(1)}
                className={navigationButtonClassName}
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              {!reducedMotion && (
                <button
                  type="button"
                  aria-label={
                    isManuallyPaused ? "Tiếp tục chuyển cảm nhận" : "Tạm dừng chuyển cảm nhận"
                  }
                  onClick={() => setIsManuallyPaused((paused) => !paused)}
                  className={navigationButtonClassName}
                >
                  {isManuallyPaused ? (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              )}
              <span className="text-sm tabular-nums text-muted-foreground">
                {currentTestimonial + 1} / {homeTestimonials.length}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </SectionShell>
  );
}
