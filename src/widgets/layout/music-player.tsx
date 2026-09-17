"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, X } from "lucide-react";

import AudioPlayer from "@/shared/ui/audio-player";
import { homePlaylist } from "@/lib/content/home";
import { Button } from "@/shared/ui/button";
import { emitPlayerEvent, subscribePlayerEvent } from "@/shared/utils/player-events";
import { PLAYER_EVENTS } from "@/types/player-events";

interface MusicPlayerProps {
  show: boolean;
}

export function MusicPlayer({ show }: MusicPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const isPanelOpen = show && isOpen;

  const closePanel = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!show) setIsOpen(false);
  }, [show]);

  useEffect(() => {
    if (!isPanelOpen) return;
    closeRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !widgetRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault();
        closePanel();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPanelOpen]);

  useEffect(() => {
    const publishPanelState = () =>
      emitPlayerEvent(isPanelOpen ? PLAYER_EVENTS.UI_OPEN : PLAYER_EVENTS.UI_CLOSE);
    publishPanelState();
    return subscribePlayerEvent(PLAYER_EVENTS.REQUEST_STATE, publishPanelState);
  }, [isPanelOpen]);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribePlayerEvent(PLAYER_EVENTS.STATE, ({ detail }) => {
      setIsPlaying(detail.isPlaying);
    });
    emitPlayerEvent(PLAYER_EVENTS.REQUEST_STATE);
    return unsubscribe;
  }, []);

  return (
    <motion.div
      ref={widgetRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden={!show}
      inert={!show}
      style={{ pointerEvents: show ? "auto" : "none" }}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-8 z-40"
    >
      <motion.button
        ref={triggerRef}
        type="button"
        aria-label="Trình phát nhạc"
        aria-expanded={isPanelOpen}
        aria-controls={panelId}
        title={isOpen ? "Thu gọn trình phát nhạc" : "Mở trình phát nhạc"}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="relative flex h-12 w-12 min-h-11 min-w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying && (
          <span
            className="absolute inset-0 -z-10 rounded-full bg-primary/40 animate-ping opacity-60 pointer-events-none"
            aria-hidden="true"
          />
        )}
        {isPlaying ? (
          <div
            className="flex h-5 w-5 items-end justify-center gap-[2.5px] pb-0.5"
            aria-hidden="true"
          >
            <motion.span
              className="w-[2.5px] rounded-full bg-primary-foreground"
              animate={{ height: ["25%", "90%", "25%"] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="w-[2.5px] rounded-full bg-primary-foreground"
              animate={{ height: ["70%", "20%", "70%"] }}
              transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.span
              className="w-[2.5px] rounded-full bg-primary-foreground"
              animate={{ height: ["40%", "100%", "40%"] }}
              transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.span
              className="w-[2.5px] rounded-full bg-primary-foreground"
              animate={{ height: ["60%", "30%", "60%"] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            />
          </div>
        ) : (
          <Music2 className="h-5 w-5" aria-hidden="true" />
        )}
      </motion.button>
      <div
        id={panelId}
        role="region"
        aria-label="Bảng điều khiển nhạc"
        hidden={!isPanelOpen}
        data-lenis-prevent
        className="absolute bottom-full right-0 mb-4 max-h-[calc(100dvh-11rem-env(safe-area-inset-bottom))] w-[280px] max-w-[calc(100vw-4rem)] overflow-y-auto overscroll-contain rounded-[24px] border border-white/10 ring-1 ring-cyan-500/20 bg-zinc-950/80 backdrop-blur-2xl text-white shadow-[0_8px_32px_rgba(0,245,255,0.15)]"
      >
        <div className="flex items-center justify-between gap-2 px-3 pt-2">
          <span className="pl-1 text-sm font-medium">Trình phát nhạc</span>
          <Button
            ref={closeRef}
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Thu gọn trình phát nhạc"
            onClick={closePanel}
            className="h-9 w-9 rounded-full text-white hover:bg-white/10 hover:text-white focus-visible:ring-white focus-visible:ring-offset-0"
          >
            <X aria-hidden="true" />
          </Button>
        </div>
        {/* Keep audio mounted when the widget is hidden or the panel is collapsed. */}
        <AudioPlayer playlist={homePlaylist} autoPlay defaultShuffle />
      </div>
    </motion.div>
  );
}
