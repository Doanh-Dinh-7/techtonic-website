"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/element/logo_white.png"
              alt="TechTonic Club"
              width={13}
              height={400}
              className="object-cover h-8"
            />

            <span className="font-semibold text-white font-paris2024 text-sm leading-none">
              TECH <br />
              TONIC
            </span>
          </motion.div>
          <p className="text-sm">
            © 2024 TechTonic Club. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
