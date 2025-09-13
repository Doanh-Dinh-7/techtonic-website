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
          <Badge className="bg-red-100 text-red-700">Video giới thiệu</Badge>
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
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </motion.button>
            </div>
            <Image
              src="/placeholder.svg?height=400&width=800&text=TechTonic+Club+Video"
              alt="TechTonic Club Video"
              fill
              className="object-cover opacity-70"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
