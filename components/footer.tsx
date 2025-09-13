"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                background: [
                  "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                  "linear-gradient(45deg, #8b5cf6, #3b82f6)",
                  "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="p-1 rounded"
            >
              <Code className="h-6 w-6 text-blue-400" />
            </motion.div>
            <span className="font-semibold text-white">TechTonic Club</span>
          </motion.div>
          <p className="text-sm">
            © 2024 TechTonic Club. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
