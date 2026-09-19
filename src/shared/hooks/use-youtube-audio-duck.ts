"use client";

import { useEffect, useRef } from "react";
import { emitPlayerEvent } from "@/shared/utils/player-events";
import { PLAYER_EVENTS } from "@/types/player-events";

const YOUTUBE_ORIGIN = "https://www.youtube.com";

interface YouTubeEventData {
  event?: string;
  info?: {
    playerState?: number;
    muted?: boolean;
    volume?: number;
  };
}

/**
 * Automatically ducks background music when YouTube video is playing with sound,
 * and restores background music when YouTube video is paused, ended, or muted.
 */
export function useYouTubeAudioDuck(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const isDuckedRef = useRef(false);
  const playerInfoRef = useRef({
    playerState: -1,
    muted: true,
    volume: 100,
  });

  useEffect(() => {
    const checkAndEmit = () => {
      const { playerState, muted, volume } = playerInfoRef.current;
      // playerState === 1 means PLAYING
      const isPlayingWithAudio = playerState === 1 && !muted && volume > 0;

      if (isPlayingWithAudio && !isDuckedRef.current) {
        isDuckedRef.current = true;
        emitPlayerEvent(PLAYER_EVENTS.DUCK_START);
      } else if (!isPlayingWithAudio && isDuckedRef.current) {
        isDuckedRef.current = false;
        emitPlayerEvent(PLAYER_EVENTS.DUCK_END);
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== YOUTUBE_ORIGIN) return;

      let data: YouTubeEventData;
      try {
        data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (!data || data.event !== "infoDelivery" || !data.info) return;

      const info = data.info;
      if (typeof info.playerState === "number") {
        playerInfoRef.current.playerState = info.playerState;
      }
      if (typeof info.muted === "boolean") {
        playerInfoRef.current.muted = info.muted;
      }
      if (typeof info.volume === "number") {
        playerInfoRef.current.volume = info.volume;
      }

      checkAndEmit();
    };

    window.addEventListener("message", handleMessage);

    const postListeningCommand = () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening" }),
        YOUTUBE_ORIGIN
      );
    };

    postListeningCommand();
    const intervalId = window.setInterval(postListeningCommand, 1500);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearInterval(intervalId);
      if (isDuckedRef.current) {
        isDuckedRef.current = false;
        emitPlayerEvent(PLAYER_EVENTS.DUCK_END);
      }
    };
  }, [iframeRef]);
}
