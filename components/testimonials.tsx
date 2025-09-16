"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/ui/typewriter";

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Nguyễn Văn Minh",
      role: "Sinh viên năm 3, Khoa Thống kê - Tin học",
      text: "TechTonic Club đã giúp tôi phát triển kỹ năng lập trình và tư duy giải quyết vấn đề. Môi trường học tập tại đây thực sự tuyệt vời!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Trần Thị Lan",
      role: "Sinh viên năm 4, Khoa Thống kê - Tin học",
      text: "Nhờ tham gia CLB, tôi đã có cơ hội tham gia các dự án thực tế và kết nối với nhiều bạn cùng đam mê công nghệ.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Lê Văn Hùng",
      role: "Cựu thành viên, hiện là Developer",
      text: "TechTonic Club đã định hướng con đường sự nghiệp của tôi. Những kiến thức và kỹ năng học được ở đây rất hữu ích cho công việc.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gray-50">
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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
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
              className="bg-white rounded-2xl shadow-lg p-8"
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

                <blockquote className="text-xl text-gray-600 italic mb-6 leading-relaxed">
                  "
                  <Typewriter
                    text={testimonials[currentTestimonial].text}
                    delay={30}
                  />
                  "
                </blockquote>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].role}
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
