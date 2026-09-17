"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useReducedMotionPreference } from "@/hooks/use3d";
import { cn } from "@/shared/utils";
import { emitPlayerEvent, subscribePlayerEvent } from "@/shared/utils/player-events";
import { PLAYER_EVENTS, type AudioTrack } from "@/types/player-events";

export interface AudioPlayerProps {
  src?: string;
  cover?: string;
  title?: string;
  playlist?: readonly AudioTrack[];
  autoPlay?: boolean;
  defaultShuffle?: boolean;
}

const formatTime = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  return `${minutes}:${Math.floor(safeSeconds % 60)
    .toString()
    .padStart(2, "0")}`;
};

const controlClassName =
  "h-10 w-10 rounded-full text-white/80 hover:bg-white/10 hover:text-white focus-visible:ring-cyan-400 focus-visible:ring-offset-0 transition-colors [&_svg]:size-5";

function PlaylistPlayer({
  tracks,
  autoPlay,
  defaultShuffle,
}: {
  tracks: readonly AudioTrack[];
  autoPlay?: boolean;
  defaultShuffle?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeOnTrackChange = useRef(false);
  const playRequest = useRef(0);
  const autoplayCleanup = useRef<(() => void) | null>(null);
  const [allowAutoplay, setAllowAutoplay] = useState(true);
  const reducedMotion = useReducedMotionPreference();
  const [order] = useState(() => {
    const initialOrder = tracks.map((_, index) => index);
    if (defaultShuffle && initialOrder.length > 1) {
      for (let index = initialOrder.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [initialOrder[index], initialOrder[randomIndex]] = [
          initialOrder[randomIndex],
          initialOrder[index],
        ];
      }
    }
    return initialOrder;
  });
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const trackIndex = order[position];
  const track = tracks[trackIndex];
  const hasPlaylist = tracks.length > 1;
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const playAudio = async (audio: HTMLAudioElement) => {
    const request = ++playRequest.current;
    setError(null);
    try {
      if (audio.error) audio.load();
      await audio.play();
    } catch (cause) {
      if (request !== playRequest.current) return;
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setIsPlaying(false);
      setError("Không thể phát bài nhạc. Vui lòng thử lại.");
    }
  };

  const cancelInteractionAutoplay = () => {
    setAllowAutoplay(false);
    if (audioRef.current) audioRef.current.autoplay = false;
    autoplayCleanup.current?.();
    autoplayCleanup.current = null;
  };

  useEffect(() => {
    if (!autoPlay || !allowAutoplay) return;

    const playOnInteraction = () => {
      const audio = audioRef.current;
      if (!audio) return;
      cancelInteractionAutoplay();
      if (audio.paused) void playAudio(audio);
    };
    // Bubble after React controls so a Play/Pause click is not handled twice.
    window.addEventListener("click", playOnInteraction);
    const cleanup = () => window.removeEventListener("click", playOnInteraction);
    autoplayCleanup.current = cleanup;

    return () => {
      cleanup();
      autoplayCleanup.current = null;
    };
  }, [autoPlay, allowAutoplay]);

  useEffect(() => {
    const unsubscribePlay = subscribePlayerEvent(PLAYER_EVENTS.PLAY, () => {
      cancelInteractionAutoplay();
      const audio = audioRef.current;
      if (audio?.paused) void playAudio(audio);
    });
    const unsubscribePause = subscribePlayerEvent(PLAYER_EVENTS.PAUSE, () => {
      cancelInteractionAutoplay();
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        playRequest.current += 1;
        audio.pause();
      }
    });

    return () => {
      unsubscribePlay();
      unsubscribePause();
    };
  }, []);

  useEffect(() => {
    const publishState = () =>
      emitPlayerEvent(PLAYER_EVENTS.STATE, { isPlaying, track, progress, currentTime, duration });
    publishState();
    return subscribePlayerEvent(PLAYER_EVENTS.REQUEST_STATE, publishState);
  }, [isPlaying, track, progress, currentTime, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setError(null);
    if (audio && resumeOnTrackChange.current) {
      resumeOnTrackChange.current = false;
      void playAudio(audio);
    }
    return () => {
      playRequest.current += 1;
      if (audio && !audio.paused) audio.pause();
    };
  }, [track.src, trackIndex]);

  const updateTime = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(Number.isFinite(audio.currentTime) ? Math.max(0, audio.currentTime) : 0);
    setDuration(Number.isFinite(audio.duration) ? Math.max(0, audio.duration) : 0);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    audio.currentTime = (Math.min(100, Math.max(0, value)) / 100) * audio.duration;
    updateTime();
  };

  const changeTrack = (nextPosition: number, resume: boolean) => {
    resumeOnTrackChange.current = resume;
    setPosition(nextPosition);
  };

  const skipTrack = (direction: -1 | 1) => {
    cancelInteractionAutoplay();
    const audio = audioRef.current;
    changeTrack(
      (position + direction + order.length) % order.length,
      Boolean(audio && !audio.paused)
    );
  };

  const handleEnded = () => {
    if (isRepeat) return;
    setIsPlaying(false);
    if (position < order.length - 1) {
      changeTrack(position + 1, true);
    }
  };

  const playRandomTrack = () => {
    if (!hasPlaylist) return;
    cancelInteractionAutoplay();
    // Pick a nonzero offset so the current track can never be selected again.
    const offset = 1 + Math.floor(Math.random() * (order.length - 1));
    changeTrack((position + offset) % order.length, true);
  };

  return (
    <motion.div
      role="group"
      aria-label="Trình phát nhạc"
      className="relative mx-auto flex w-full max-w-full flex-col overflow-hidden bg-transparent p-4 pt-2"
      initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reducedMotion ? undefined : { opacity: 0, y: 20, filter: "blur(10px)" }}
      transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        autoPlay={autoPlay && allowAutoplay}
        loop={isRepeat}
        onLoadedMetadata={updateTime}
        onDurationChange={updateTime}
        onTimeUpdate={updateTime}
        onPlay={(event) => {
          cancelInteractionAutoplay();
          setIsPlaying(!event.currentTarget.paused);
        }}
        onPause={(event) => setIsPlaying(!event.currentTarget.paused)}
        onEnded={handleEnded}
        onError={() => {
          setIsPlaying(false);
          setError("Không thể tải bài nhạc. Kiểm tra kết nối hoặc thử lại.");
        }}
        className="hidden"
      />

      {track.cover && (
        <div className="relative mb-4 mt-1 h-[180px] w-full shrink-0">
          <div
            className={cn(
              "absolute inset-0 scale-95 rounded-2xl bg-cyan-500/40 blur-xl transition-opacity duration-700",
              isPlaying ? "opacity-70" : "opacity-20"
            )}
            aria-hidden="true"
          />
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-inner">
            <Image
              src={track.cover}
              alt={track.title ? `Ảnh bìa ${track.title}` : "Ảnh bìa bài nhạc"}
              width={256}
              height={180}
              unoptimized
              className={cn(
                "h-full w-full object-cover transition-transform duration-700",
                isPlaying ? "scale-105" : "scale-100"
              )}
            />
          </div>
        </div>
      )}

      <div className="flex w-full flex-col gap-y-3">
        {track.title && (
          <div className="flex items-center justify-center gap-2 px-2">
            <h3
              className="truncate break-words text-center text-base font-bold text-white"
              aria-live="polite"
            >
              {track.title}
            </h3>
            {isPlaying && (
              <div className="flex h-3 items-end gap-[2px] opacity-80" aria-hidden="true">
                <motion.div
                  className="w-[3px] rounded-t-sm bg-cyan-400"
                  animate={{ height: ["40%", "100%", "40%"] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="w-[3px] rounded-t-sm bg-cyan-400"
                  animate={{ height: ["80%", "30%", "80%"] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                />
                <motion.div
                  className="w-[3px] rounded-t-sm bg-cyan-400"
                  animate={{ height: ["50%", "90%", "50%"] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
              </div>
            )}
          </div>
        )}
        {hasPlaylist && (
          <p className="text-center text-xs font-medium text-cyan-100/50 uppercase tracking-widest">
            Bài {position + 1} / {tracks.length}
          </p>
        )}

        <div className="flex flex-col gap-y-1">
          <div className="group relative flex h-6 items-center">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner"
              aria-hidden="true"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,245,255,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: reducedMotion ? 0 : 0.15 }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              disabled={duration <= 0}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label="Tiến độ phát nhạc"
              aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:opacity-0 group-hover:[&::-moz-range-thumb]:opacity-100 [&::-moz-range-thumb]:transition-opacity [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,255,255,0.8)] [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-thumb]:transition-opacity"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-medium tracking-wider tabular-nums text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="mx-auto flex max-w-full items-center justify-center gap-1.5 rounded-[1.25rem] bg-white/5 p-2 shadow-inner border border-white/5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Phát ngẫu nhiên"
            title={
              hasPlaylist
                ? "Phát một bài ngẫu nhiên khác"
                : "Phát ngẫu nhiên cần ít nhất hai bài nhạc"
            }
            disabled={!hasPlaylist}
            onClick={playRandomTrack}
            className={controlClassName}
          >
            <Shuffle aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Bài trước"
            title={hasPlaylist ? "Bài trước" : "Danh sách hiện chỉ có một bài nhạc"}
            disabled={!hasPlaylist}
            onClick={() => skipTrack(-1)}
            className={controlClassName}
          >
            <SkipBack aria-hidden="true" />
          </Button>
          <motion.div
            whileHover={reducedMotion ? undefined : { scale: 1.05 }}
            whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            className="px-1"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isPlaying ? "Tạm dừng" : "Phát nhạc"}
              title="Tạm dừng"
              onClick={() => {
                cancelInteractionAutoplay();
                const audio = audioRef.current;
                if (!audio) return;
                if (audio.paused) {
                  void playAudio(audio);
                } else {
                  playRequest.current += 1;
                  audio.pause();
                }
              }}
              className="h-12 w-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] hover:from-cyan-400 hover:to-blue-500 hover:text-white transition-all [&_svg]:size-6"
            >
              {isPlaying ? (
                <Pause aria-hidden="true" className="fill-current" />
              ) : (
                <Play aria-hidden="true" className="fill-current ml-1" />
              )}
            </Button>
          </motion.div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Bài tiếp theo"
            title={hasPlaylist ? "Bài tiếp theo" : "Danh sách hiện chỉ có một bài nhạc"}
            disabled={!hasPlaylist}
            onClick={() => skipTrack(1)}
            className={controlClassName}
          >
            <SkipForward aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Lặp bài nhạc"
            title={`${isRepeat ? "Tắt" : "Bật"} lặp bài đang nghe`}
            aria-pressed={isRepeat}
            onClick={() => setIsRepeat((repeat) => !repeat)}
            className={cn(
              controlClassName,
              isRepeat && "text-cyan-400 bg-cyan-400/15 hover:text-cyan-300 hover:bg-cyan-400/20"
            )}
          >
            <Repeat1 aria-hidden="true" />
          </Button>
        </div>
        <p role="status" className="text-center text-xs text-white/60">
          Lặp bài nhạc: {isRepeat ? "Bật" : "Tắt"}
        </p>
        {error && (
          <p role="alert" className="text-center text-xs text-red-200">
            {error}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function AudioPlayer({
  src,
  cover,
  title,
  playlist,
  autoPlay,
  defaultShuffle,
}: AudioPlayerProps) {
  const tracks = playlist?.length ? playlist : src ? [{ src, cover, title }] : [];
  const playableTracks = tracks.filter((track) => track.src.trim());

  return (
    <AnimatePresence>
      {playableTracks.length > 0 && (
        <PlaylistPlayer
          key={JSON.stringify(playableTracks.map((track) => track.src))}
          tracks={playableTracks}
          autoPlay={autoPlay}
          defaultShuffle={defaultShuffle}
        />
      )}
    </AnimatePresence>
  );
}
