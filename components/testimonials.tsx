"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/ui/typewriter";

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

  // Text for testimonials is max 55 words
  const testimonials = [
    {
      name: "Nguyễn Văn Quang",
      role: "Founder/Chủ nhiệm CLB TechTonic nhiệm kỳ 2024 - 2025",
      year: 2022, // Nhập học năm 2022
      text: "Với mình, TechTonic không chỉ là một CLB học thuật về công nghệ thông tin, mà còn là một môi trường năng động, sáng tạo và gắn kết, nơi mỗi thành viên đều có cơ hội rèn luyện, phát triển bản thân và cùng nhau tạo nên những kỷ niệm đáng nhớ!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Nguyễn Thị Ngọc Nhi",
      role: "Phó chủ nhiệm CLB TechTonic nhiệm kỳ 2025 - 2026",
      year: 2024, // Nhập học năm 2024
      text: "Nhờ tham gia CLB, mình vừa học hỏi, rèn luyện kỹ năng, vừa gắn kết như một gia đình nhỏ. Ở vai trò Phó chủ nhiệm, mình tự hào đồng hành cùng mọi người tạo ra hoạt động ý nghĩa, kỷ niệm đẹp. CLB là môi trường tuyệt vời để khám phá bản thân, phát triển năng lực và lan tỏa giá trị tích cực.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lê Văn Hùng",
      role: "hiện là Developer",
      year: 2025, // Nhập học 2025
      text: "TechTonic Club đã định hướng con đường sự nghiệp của tôi. Những kiến thức và kỹ năng học được ở đây rất hữu ích cho công việc.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  // Auto-rotate testimonials based on typewriter completion
  useEffect(() => {
    if (isHovered) return; // Pause when hovered

    if (isTypewriterComplete) {
      // Wait 3 seconds after typewriter completes, then move to next testimonial
      const timeout = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsTypewriterComplete(false); // Reset for next testimonial
      }, 3000);

      setTimeoutId(timeout);
      return () => clearTimeout(timeout);
    }
  }, [isTypewriterComplete, isHovered, testimonials.length]);

  // Clear timeout when component unmounts or hover state changes
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  // Reset typewriter completion when testimonial changes
  useEffect(() => {
    setIsTypewriterComplete(false);
  }, [currentTestimonial]);

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-700 hover:text-indigo-100">
            Cảm nhận
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 font-paris2024">
            Thành viên nói gì về chúng tôi
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 ${
                isHovered ? "shadow-xl scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                >
                  <Image
                    src={
                      testimonials[currentTestimonial].image ||
                      "/placeholder.svg"
                    }
                    alt={testimonials[currentTestimonial].name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-6"
                  />
                </motion.div>

                <div className="flex justify-center mb-6">
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

                <blockquote className="text-xl text-gray-600 italic mb-6 leading-relaxed min-h-[8rem] md:min-h-[6rem]">
                  "
                  <Typewriter
                    text={testimonials[currentTestimonial].text}
                    delay={20}
                    pause={isHovered}
                    onComplete={() => setIsTypewriterComplete(true)}
                  />
                  "
                </blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-xl font-medium text-gray-900 font-utm-akashi">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {`${getDynamicRole(
                      testimonials[currentTestimonial].year
                    )} - ${testimonials[currentTestimonial].role}`}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-indigo-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
