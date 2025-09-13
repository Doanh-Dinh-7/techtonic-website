"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, Trophy, Presentation } from "lucide-react";
import Image from "next/image";

export function Activities() {
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    {
      title: "Workshop Công nghệ",
      description:
        "Tổ chức workshop định kỳ về các công nghệ mới nhất như AI, Machine Learning, Web Development và Data Science.",
      image: "/placeholder.svg?height=200&width=400&text=Workshop",
      icon: Code,
    },
    {
      title: "Hackathon & Contest",
      description:
        "Tham gia và tổ chức các cuộc thi lập trình, hackathon để thử thách và phát triển kỹ năng coding.",
      image: "/placeholder.svg?height=200&width=400&text=Hackathon",
      icon: Trophy,
    },
    {
      title: "Tech Talk & Seminar",
      description:
        "Mời các chuyên gia trong ngành chia sẻ kinh nghiệm và xu hướng công nghệ mới nhất.",
      image: "/placeholder.svg?height=200&width=400&text=Tech+Talk",
      icon: Presentation,
    },
  ];

  // Auto-rotate activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="activities" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-purple-100 text-purple-700">Hoạt động</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Các hoạt động nổi bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá những chương trình đa dạng và bổ ích của TechTonic Club
          </p>
        </motion.div>

        {/* Activity Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={
                        activities[currentActivity].image || "/placeholder.svg"
                      }
                      alt={activities[currentActivity].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        {React.createElement(activities[currentActivity].icon, {
                          className: "h-6 w-6 text-purple-600",
                        })}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {activities[currentActivity].title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {activities[currentActivity].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Activity Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentActivity(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentActivity ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
