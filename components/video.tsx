"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import Image from "next/image";

export function Video() {
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
          <Badge className="bg-red-100 text-red-700 hover:bg-red-700 hover:text-red-100">
            Video giới thiệu
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Khám phá TechTonic Club
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Xem video để hiểu rõ hơn về hoạt động và tinh thần của câu lạc bộ
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-red-200 aspect-video ">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0qoiC8_fi8k?rel=0&autoplay=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
