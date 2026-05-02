"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

type ChatFabProps = {
  onOpen: () => void;
};

export function ChatFab({ onOpen }: ChatFabProps) {
  return (
    <motion.button
      key="chat-fab"
      type="button"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Mở chat TechTonic"
      onClick={onOpen}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white shadow-lg transition-shadow hover:shadow-xl"
      whileHover={{
        scale: 1.1,
        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
      }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageSquare className="h-5 w-5" />
    </motion.button>
  );
}
