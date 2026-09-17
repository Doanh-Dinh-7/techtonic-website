/**
 * @vitest-environment jsdom
 */

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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

function page(showHeader: boolean) {
  return (
    <>
      <MusicPlayer />
      {showHeader && <Header show onLogoClick={() => {}} />}
    </>
  );
}

describe("MusicPlayer integration", () => {
  it("restores header controls after remount while paused and keeps both controls in sync", () => {
    const { rerender } = render(page(false));
    fireEvent.click(screen.getByRole("button", { name: "Trình phát nhạc" }));
    fireEvent.click(screen.getByRole("button", { name: "Tạm dừng" }));
    fireEvent.click(screen.getByRole("button", { name: "Thu gọn trình phát nhạc" }));

    rerender(page(true));
    const header = within(screen.getByRole("banner"));
    expect(header.getByText("Alpha")).toBeInTheDocument();
    fireEvent.click(header.getByRole("button", { name: "Phát nhạc" }));
    expect(header.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Trình phát nhạc" }));
    expect(header.queryByText("Alpha")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Tạm dừng" }));
    fireEvent.click(screen.getByRole("button", { name: "Thu gọn trình phát nhạc" }));
    expect(header.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();
  });

  it("keeps the mini player hidden when the header mounts while the panel is already open", () => {
    const { rerender } = render(page(false));
    fireEvent.click(screen.getByRole("button", { name: "Trình phát nhạc" }));
    rerender(page(true));
    const header = within(screen.getByRole("banner"));
    expect(header.queryByText("Alpha")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Thu gọn trình phát nhạc" }));
    expect(header.getByText("Alpha")).toBeInTheDocument();
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
