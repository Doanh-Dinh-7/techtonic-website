/**
 * @vitest-environment jsdom
 */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./header";
import { MusicPlayer } from "./music-player";

vi.unmock("framer-motion");
vi.mock("@/hooks/use3d", () => ({ useReducedMotionPreference: () => true }));
vi.mock("@/lib/content/home", () => ({
  homePlaylist: [{ src: "/audio/alpha.mp3", title: "Alpha" }],
}));

let paused: WeakMap<HTMLMediaElement, boolean>;

beforeEach(() => {
  paused = new WeakMap();
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(function (
    this: HTMLMediaElement
  ) {
    return paused.get(this) ?? true;
  });
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function (
    this: HTMLMediaElement
  ) {
    paused.set(this, false);
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function (
    this: HTMLMediaElement
  ) {
    paused.set(this, true);
    this.dispatchEvent(new Event("pause"));
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function page(showHeader: boolean, showMusic = true) {
  return (
    <>
      <MusicPlayer show={showMusic} />
      {showHeader && <Header show onLogoClick={() => {}} />}
    </>
  );
}

describe("MusicPlayer integration", () => {
  it("hides its controls and closes the panel without resetting audio when visibility changes", () => {
    const { container, rerender } = render(page(true, false));
    const audio = container.querySelector("audio")!;
    expect(screen.queryByRole("button", { name: "Trình phát nhạc" })).not.toBeInTheDocument();

    fireEvent.click(document.body);
    expect(audio.paused).toBe(false);
    Object.defineProperty(audio, "duration", { configurable: true, value: 180 });
    audio.currentTime = 42;
    fireEvent.loadedMetadata(audio);

    rerender(page(true, true));
    fireEvent.click(screen.getByRole("button", { name: "Trình phát nhạc" }));
    fireEvent.click(screen.getByRole("button", { name: "Lặp bài nhạc" }));
    expect(screen.getByRole("region", { name: "Bảng điều khiển nhạc" })).toBeInTheDocument();

    rerender(page(true, false));
    expect(screen.queryByRole("button", { name: "Trình phát nhạc" })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Bảng điều khiển nhạc" })).not.toBeInTheDocument();
    expect(container.querySelector("audio")).toBe(audio);
    expect(audio.paused).toBe(false);
    expect(audio.currentTime).toBe(42);
    expect(audio.loop).toBe(true);

    rerender(page(true, true));
    expect(screen.getByRole("button", { name: "Trình phát nhạc" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(container.querySelector("audio")).toBe(audio);
    expect(audio.play).toHaveBeenCalledOnce();
    expect(audio.pause).not.toHaveBeenCalled();
  });

  it("closes by the trigger, Escape, or outside interaction without stopping playback", () => {
    render(page(false));
    const trigger = screen.getByRole("button", { name: "Trình phát nhạc" });
    fireEvent.click(trigger);
    const audio = screen
      .getByRole("region", { name: "Bảng điều khiển nhạc" })
      .querySelector("audio")!;
    expect(audio.paused).toBe(false);
    expect(screen.getByRole("button", { name: "Thu gọn trình phát nhạc" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(audio.paused).toBe(false);
    expect(audio.play).toHaveBeenCalledOnce();
  });
});
