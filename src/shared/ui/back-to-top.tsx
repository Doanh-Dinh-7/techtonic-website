"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
  show: boolean;
  onClick: () => void;
}

export function BackToTop({ show, onClick }: BackToTopProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white shadow-lg transition-shadow hover:shadow-xl"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
