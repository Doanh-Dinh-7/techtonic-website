"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Music2, X } from "lucide-react";

import AudioPlayer from "@/shared/ui/audio-player";
import { homePlaylist } from "@/lib/content/home";
import { Button } from "@/shared/ui/button";
import { cn } from "@/lib/utils";
import { emitPlayerEvent } from "@/shared/utils/player-events";
import { PLAYER_EVENTS } from "@/types/player-events";

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const closePanel = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen]);

  useEffect(() => {
    emitPlayerEvent(isOpen ? PLAYER_EVENTS.UI_OPEN : PLAYER_EVENTS.UI_CLOSE);
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-8 z-40"
    >
      <Button
        ref={triggerRef}
        type="button"
        size="icon"
        aria-label="Trình phát nhạc"
        aria-expanded={isOpen}
        aria-controls={panelId}
        title={isOpen ? "Thu gọn trình phát nhạc" : "Mở trình phát nhạc"}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={cn(
          "h-14 w-14 rounded-full shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] [&_svg]:size-6",
          isOpen
            ? "bg-zinc-800 text-white hover:bg-zinc-700"
            : "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white"
        )}
      >
        <Music2 aria-hidden="true" />
      </Button>
      <div
        id={panelId}
        role="region"
        aria-label="Bảng điều khiển nhạc"
        hidden={!isOpen}
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
        {/* Always mount the player to allow autoplay. Collapsing does not stop the audio. */}
        <AudioPlayer playlist={homePlaylist} autoPlay defaultShuffle />
      </div>
    </div>
  );
}
