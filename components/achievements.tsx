"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Code, Calendar } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import Image from "next/image";

export function Achievements() {
  const stats = [
    { icon: Trophy, number: 10, label: "Giải thưởng", color: "yellow" },
    { icon: Users, number: 100, label: "Thành viên", color: "blue" },
    { icon: Code, number: 20, label: "Dự án", color: "green" },
    { icon: Calendar, number: 2, label: "Năm hoạt động", color: "purple" },
  ];

  // Danh sách đối tác - dễ dàng thêm/bớt
  // const partners = [
  //   { src: "/placeholder.svg?height=60&width=120", alt: "Đại học" },
  //   { src: "/placeholder.svg?height=60&width=120", alt: "Viện nghiên cứu" },
  //   { src: "/placeholder.svg?height=60&width=120", alt: "Công ty công nghệ" },
  //   { src: "/placeholder.svg?height=60&width=120", alt: "Quỹ giáo dục" },
  //   { src: "/placeholder.svg?height=60&width=120", alt: "Đối tác khác" },
  // ];

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
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-700 hover:text-yellow-100">
            Thành tích
          </Badge>
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
        <div className="bg-white rounded-2xl p-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              Đối tác & Hợp tác
            </h3>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"> */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 items-center">
              {/* <div className="h-[40px] flex items-center justify-center">
                <Image
                  src="/achievement/vtc_academy.png"
                  alt="Đại học"
                  width={0}
                  height={40}
                  sizes="auto"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="h-[40px] flex items-center justify-center">
                <Image
                  src="/achievement/mgm_technology.png"
                  alt="Viện nghiên cứu"
                  width={0}
                  height={40}
                  sizes="auto"
                  className="h-full w-auto object-contain"
                />
              </div> */}
              {[
                { src: "/achievement/vtc_academy.webp", alt: "VTC Academy" },
                {
                  src: "/achievement/mgm_technology.webp",
                  alt: "MGM Technology",
                },
              ].map((partner, index) => (
                <motion.div
                  key={partner.alt}
                  className="h-[40px] flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={0}
                    height={40}
                    sizes="auto"
                    className="h-full w-auto object-contain transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* <div className="relative overflow-hidden">
            <div className="flex animate-scroll-smooth hover:pause-animation">
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="flex items-center shrink-0"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="w-16"></div>
                </div>
              ))}

              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="flex items-center shrink-0"
                >
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={120}
                    height={60}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="w-16"></div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
