"use client";

import { motion, AnimatePresence } from "framer-motion";
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
          type="button"
          aria-label="Cuộn lên đầu trang"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 min-h-11 min-w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          whileHover={{
            scale: 1.1,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
