/**
 * @vitest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

  it("mutes YouTube when the music player starts", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    window.dispatchEvent(new CustomEvent("player:state", { detail: { isPlaying: true } }));

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "muteVideo", args: [] }),
      "https://www.youtube.com"
    );
  });

  it("does not change YouTube volume when the music player pauses", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    window.dispatchEvent(new CustomEvent("player:state", { detail: { isPlaying: false } }));

    expect(postMessage).not.toHaveBeenCalled();
  });

  it("mutes a reloaded iframe while music is still playing", () => {
    render(<Video />);
    const iframe = screen.getByTitle<HTMLIFrameElement>("YouTube video player");
    const postMessage = vi.spyOn(iframe.contentWindow!, "postMessage");

    window.dispatchEvent(new CustomEvent("player:state", { detail: { isPlaying: true } }));
    postMessage.mockClear();
    fireEvent.load(iframe);

    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({ event: "command", func: "muteVideo", args: [] }),
      "https://www.youtube.com"
    );
  });
});
