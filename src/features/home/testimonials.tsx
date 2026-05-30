"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

    if (currentMonth >= 7) {
      academicYearDifference = currentYear - year;
    } else {
      academicYearDifference = currentYear - 1 - year;
    }

    if (academicYearDifference > 4) {
      return "Cựu sinh viên";
    } else if (academicYearDifference < 1) {
      return "Tân sinh viên";
    } else {
      return `Sinh viên năm ${academicYearDifference + 1}`;
    }
  };

  const testimonials = [
    {
      name: "Nguyễn Văn Quang",
      role: "Founder/Chủ nhiệm CLB TechTonic nhiệm kỳ 2024 - 2025",
      year: 2022,
      text: "Với mình, TechTonic không chỉ là một CLB học thuật về công nghệ thông tin, mà còn là một môi trường năng động, sáng tạo và gắn kết, nơi mỗi thành viên đều có cơ hội rèn luyện, phát triển bản thân và cùng nhau tạo nên những kỷ niệm đáng nhớ!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Nguyễn Thị Ngọc Nhi",
      role: "Phó chủ nhiệm CLB TechTonic nhiệm kỳ 2025 - 2026",
      year: 2024,
      text: "Nhờ tham gia CLB, mình vừa học hỏi, rèn luyện kỹ năng, vừa gắn kết như một gia đình nhỏ. Ở vai trò Phó chủ nhiệm, mình tự hào đồng hành cùng mọi người tạo ra hoạt động ý nghĩa, kỷ niệm đẹp. CLB là môi trường tuyệt vời để khám phá bản thân, phát triển năng lực và lan tỏa giá trị tích cực.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lê Văn Hùng",
      role: "hiện là Developer",
      year: 2025,
      text: "TechTonic Club đã định hướng con đường sự nghiệp của tôi. Những kiến thức và kỹ năng học được ở đây rất hữu ích cho công việc.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  useEffect(() => {
    if (isHovered) return;

    if (isTypewriterComplete) {
      const timeout = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTypewriterComplete(false);
      }, 3000);

      setTimeoutId(timeout);
      return () => clearTimeout(timeout);
    }
  }, [isTypewriterComplete, isHovered, testimonials.length]);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  useEffect(() => {
    setIsTypewriterComplete(false);
  }, [currentTestimonial]);

  const active = testimonials[currentTestimonial];

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
                  <Image
                    src={active.image || "/placeholder.svg"}
                    alt={active.name}
                    width={80}
                    height={80}
                    className="mx-auto mb-6 rounded-full"
                  />
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

                <blockquote className="mb-6 min-h-[8rem] text-xl italic leading-relaxed text-white/75 md:min-h-[6rem]">
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
        {testimonials.map((_, index) => (
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
