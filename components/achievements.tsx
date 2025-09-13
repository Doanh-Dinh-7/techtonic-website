"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Code, Calendar } from "lucide-react";
import { Counter } from "@/components/ui/counter";

export function Achievements() {
  const stats = [
    { icon: Trophy, number: 25, label: "Giải thưởng", color: "yellow" },
    { icon: Users, number: 100, label: "Thành viên", color: "blue" },
    { icon: Code, number: 50, label: "Dự án", color: "green" },
    { icon: Calendar, number: 3, label: "Năm hoạt động", color: "purple" },
  ];

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-yellow-100 text-yellow-700">Thành tích</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Dấu ấn & Thành tựu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những thành tích đáng tự hào của TechTonic Club qua các năm hoạt
            động
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`w-16 h-16 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.5 },
                }}
              >
                {React.createElement(stat.icon, {
                  className: `h-8 w-8 text-${stat.color}-600`,
                })}
              </motion.div>
              <div className={`text-3xl font-bold text-${stat.color}-600`}>
                <Counter end={stat.number} />+
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
