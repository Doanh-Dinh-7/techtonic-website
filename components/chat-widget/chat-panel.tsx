"use client";

import { motion } from "framer-motion";
import { Minus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChatPanelProps = {
  children: React.ReactNode;
  onMinimize: () => void;
  onClose: () => void;
};

export function ChatPanel({ children, onMinimize, onClose }: ChatPanelProps) {
  return (
    <motion.div
      key="chat-panel"
      initial={{ scale: 0.96, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.96, opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="w-[calc(100vw-2rem)] max-w-[420px] sm:w-[360px] md:w-[380px]"
    >
      <Card className="max-h-[calc(100vh-104px)] border-border/80 bg-card/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/90 sm:max-h-[calc(100vh-140px)]">
        <CardHeader className="border-b py-4">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Chat TechTonic
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                aria-label="Thu nhỏ"
                onClick={onMinimize}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Đóng" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">{children}</CardContent>
      </Card>
    </motion.div>
  );
}
