/**
 * @vitest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { emitPlayerEvent } from "@/shared/utils/player-events";
import { PLAYER_EVENTS } from "@/types/player-events";

import { Video } from "./video";

function emitMusicState(isPlaying: boolean) {
  emitPlayerEvent(PLAYER_EVENTS.STATE, {
    isPlaying,
    track: { src: "/audio/sample.mp3" },
    progress: 0,
    currentTime: 0,
    duration: 120,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Video", () => {
  it("stops receiving player state after unmount", () => {
    const { unmount } = render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    unmount();
    emitMusicState(true);

    expect(postMessage).not.toHaveBeenCalled();
  });

  it("enables the YouTube JavaScript API", () => {
    render(<Video />);

    expect(screen.getByTitle("YouTube video player")).toHaveAttribute(
      "src",
      expect.stringContaining("enablejsapi=1")
    );
  });

  it("mutes YouTube when the music player starts", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    emitMusicState(true);

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "muteVideo", args: [] }),
      "https://www.youtube.com"
    );
  });

  it("does not change YouTube volume when the music player pauses", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    emitMusicState(false);

    expect(postMessage).not.toHaveBeenCalled();
  });

  it("mutes a reloaded iframe while music is still playing", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    emitMusicState(true);
    postMessage.mockClear();
    fireEvent.load(iframe);

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "muteVideo", args: [] }),
      "https://www.youtube.com"
    );
  });
});
