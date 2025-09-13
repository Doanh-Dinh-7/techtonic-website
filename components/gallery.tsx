"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function Gallery() {
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
          <Badge className="bg-orange-100 text-orange-700">Thư viện ảnh</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Khoảnh khắc đáng nhớ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những hình ảnh sinh động về các hoạt động của TechTonic Club
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <motion.div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={`/gallery_text.png?height=300&width=300&text=Gallery+${
                  index + 1
                }`}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
