"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Heart, Handshake, Shield, Star, Flag, Gem } from "lucide-react";

const valueItems = [
  {
    icon: Heart,
    title: "Tinh thần chia sẻ",
    iconWrap: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: Handshake,
    title: "Sự tương trợ",
    iconWrap: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Shield,
    title: "Sự chân thành",
    iconWrap: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Star,
    title: "Sự tôn trọng",
    iconWrap: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Flag,
    title: "Sự trách nhiệm",
    iconWrap: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export function CoreValues() {
  return (
    <section id="core-values" className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-3 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-purple-100">
            <Gem className="h-3 w-3 mr-1 inline" />
            Giá trị cốt lõi
          </Badge>
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 font-paris2024">
            Những điều chúng mình cùng giữ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nền tảng văn hóa TechTonic — xem thêm tầm nhìn &amp; sứ mệnh đầy đủ tại trang Giới
            thiệu.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
          {valueItems.map((v, index) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${v.iconWrap}`}
              >
                <v.icon className={`h-6 w-6 ${v.iconColor}`} />
              </div>
              <span className="font-medium text-gray-800 text-sm">{v.title}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            asChild
            className="bg-white text-purple-600 hover:bg-purple-50 font-semibold"
          >
            <Link href="/about">Xem Giới thiệu đầy đủ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
