"use client";

import { motion } from "framer-motion";

type ChatMinimizedBarProps = {
  onRestore: () => void;
};

export function ChatMinimizedBar({ onRestore }: ChatMinimizedBarProps) {
  return (
    <motion.button
      type="button"
      className="flex w-full items-center justify-between rounded-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] px-4 py-2 text-white shadow-lg"
      onClick={onRestore}
      aria-label="Mở lại chat"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span>Chat TechTonic</span>
      <span className="text-xs opacity-80">Mở lại</span>
    </motion.button>
  );
}
