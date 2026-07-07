"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { homeTestimonials } from "@/lib/content/home";
import { TestimonialCatAvatar } from "@/features/home/components/testimonial-cat-avatar";
import { Card3D, GlassCard, GradientOrb, SectionShell } from "@/shared/ui-v2";
import { Typewriter } from "@/shared/ui/typewriter";

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const getDynamicRole = (year: number) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    let academicYearDifference;

    if (currentMonth >= 6) {
      academicYearDifference = currentYear - year;
    } else {
      academicYearDifference = currentYear - 1 - year;
    }

    if (academicYearDifference >= 4) {
      return "Cựu sinh viên";
    } else if (academicYearDifference < 1) {
      return "Tân sinh viên";
    } else {
      return `Sinh viên năm ${academicYearDifference + 1}`;
    }
  };

  useEffect(() => {
    if (isHovered) return;

    if (isTypewriterComplete) {
      const timeout = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % homeTestimonials.length);
        setIsTypewriterComplete(false);
      }, 3000);

      setTimeoutId(timeout);
      return () => clearTimeout(timeout);
    }
  }, [isTypewriterComplete, isHovered]);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  useEffect(() => {
    setIsTypewriterComplete(false);
  }, [currentTestimonial]);

  const active = homeTestimonials[currentTestimonial];

  return (
    <SectionShell
      id="testimonials"
      badge="Cảm nhận"
      title="Thành viên nói gì về chúng tôi"
      contentClassName="max-w-4xl"
    >
      <GradientOrb className="left-1/2 top-8 -translate-x-1/2" color="magenta" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card3D>
            <GlassCard
              glow="purple"
              className={`p-8 transition-all duration-300 ${isHovered ? "scale-[1.01]" : ""}`}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                >
                  <TestimonialCatAvatar variant={active.catVariant} name={active.name} />
                </motion.div>

                <div className="mb-6 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="mb-6 min-h-[12rem] text-xl italic leading-relaxed text-white/75 md:min-h-[10rem]">
                  &ldquo;
                  <Typewriter
                    text={active.text}
                    delay={20}
                    pause={isHovered}
                    onComplete={() => setIsTypewriterComplete(true)}
                  />
                  &rdquo;
                </blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-utm-akashi text-xl font-semibold">{active.name}</p>
                  <p className="text-white/65">
                    {`${getDynamicRole(active.year)} - ${active.role}`}
                  </p>
                </motion.div>
              </div>
            </GlassCard>
          </Card3D>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-2">
        {homeTestimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Xem cảm nhận ${index + 1}`}
            aria-current={index === currentTestimonial ? "true" : undefined}
            onClick={() => setCurrentTestimonial(index)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full"
          >
            <span
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentTestimonial ? "bg-cyan-300" : "bg-white/30"
              }`}
            />
          </button>
        ))}
      </div>
    </SectionShell>
  );
}
