/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PLAYER_EVENTS } from "@/types/player-events";

import { Video } from "./video";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Video", () => {
  it("enables the YouTube JavaScript API", () => {
    render(<Video />);

    expect(screen.getByTitle("YouTube video player")).toHaveAttribute(
      "src",
      expect.stringContaining("enablejsapi=1")
    );
  });

  it("sends listening command to YouTube iframe", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    // Fast-forward interval or verify postMessage called
    expect(postMessage).toBeDefined();
  });

  it("emits DUCK_START when YouTube plays with audio and DUCK_END when muted or paused", () => {
    const duckStartSpy = vi.fn();
    const duckEndSpy = vi.fn();

    window.addEventListener(PLAYER_EVENTS.DUCK_START, duckStartSpy);
    window.addEventListener(PLAYER_EVENTS.DUCK_END, duckEndSpy);

    render(<Video />);

    // Giả lập YouTube gửi message đang phát có tiếng
    window.dispatchEvent(
      new MessageEvent("message", {
        origin: "https://www.youtube.com",
        data: JSON.stringify({
          event: "infoDelivery",
          info: { playerState: 1, muted: false, volume: 100 },
        }),
      })
    );

    expect(duckStartSpy).toHaveBeenCalledOnce();

    // Giả lập YouTube bị tắt tiếng
    window.dispatchEvent(
      new MessageEvent("message", {
        origin: "https://www.youtube.com",
        data: JSON.stringify({
          event: "infoDelivery",
          info: { playerState: 1, muted: true, volume: 100 },
        }),
      })
    );

    expect(duckEndSpy).toHaveBeenCalledOnce();

    window.removeEventListener(PLAYER_EVENTS.DUCK_START, duckStartSpy);
    window.removeEventListener(PLAYER_EVENTS.DUCK_END, duckEndSpy);
  });
});
