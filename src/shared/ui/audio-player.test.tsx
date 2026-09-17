/**
 * @vitest-environment jsdom
 */

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AudioPlayer from "@/shared/ui/audio-player";
import { emitPlayerEvent, subscribePlayerEvent } from "@/shared/utils/player-events";
import { PLAYER_EVENTS, type AudioTrack } from "@/types/player-events";

// The global motion mock creates a different component on every property read,
// which replaces the audio element during playback state updates.
vi.unmock("framer-motion");
vi.mock("@/hooks/use3d", () => ({
  useReducedMotionPreference: () => true,
}));

const playlist: AudioTrack[] = [
  { src: "/audio/alpha.mp3", title: "Alpha" },
  { src: "/audio/bravo.mp3", title: "Bravo" },
  { src: "/audio/charlie.mp3", title: "Charlie" },
];

let paused: WeakMap<HTMLMediaElement, boolean>;

function audioElement() {
  const audio = screen.getByRole("group", { name: "Trình phát nhạc" }).querySelector("audio");
  if (!audio) throw new Error("Expected the audio element to be mounted");
  return audio;
}

function setMetadata(audio: HTMLAudioElement, duration: number, currentTime = 0) {
  Object.defineProperty(audio, "duration", { configurable: true, value: duration });
  audio.currentTime = currentTime;
  fireEvent.loadedMetadata(audio);
}

function finishTrack() {
  const audio = audioElement();
  paused.set(audio, true);
  fireEvent.ended(audio);
}

function expectTrack(title: string, src: string) {
  expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  expect(audioElement()).toHaveAttribute("src", src);
}

beforeEach(() => {
  paused = new WeakMap();
  vi.spyOn(HTMLMediaElement.prototype, "paused", "get").mockImplementation(function () {
    return paused.get(this) ?? true;
  });
  vi.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(function () {
    paused.set(this, false);
    this.dispatchEvent(new Event("play"));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(function () {
    if (paused.get(this) === false) {
      paused.set(this, true);
      this.dispatchEvent(new Event("pause"));
    }
  });
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("AudioPlayer", () => {
  it("handles external commands once after updates and releases listeners on unmount", () => {
    const stateListener = vi.fn();
    const unsubscribe = subscribePlayerEvent(PLAYER_EVENTS.STATE, stateListener);

    try {
      const { unmount } = render(
        <StrictMode>
          <AudioPlayer playlist={playlist} />
        </StrictMode>
      );
      const audio = audioElement();

      act(() => emitPlayerEvent(PLAYER_EVENTS.PLAY));
      expect(audio.play).toHaveBeenCalledOnce();
      expect(stateListener.mock.lastCall?.[0].detail).toMatchObject({
        isPlaying: true,
        track: playlist[0],
      });

      setMetadata(audio, 120, 30);
      audio.currentTime = 60;
      fireEvent.timeUpdate(audio);
      expect(stateListener.mock.lastCall?.[0].detail).toMatchObject({
        progress: 50,
        currentTime: 60,
        duration: 120,
      });

      act(() => emitPlayerEvent(PLAYER_EVENTS.PAUSE));
      expect(audio.pause).toHaveBeenCalledOnce();
      expect(stateListener.mock.lastCall?.[0].detail.isPlaying).toBe(false);

      act(() => emitPlayerEvent(PLAYER_EVENTS.PLAY));
      expect(audio.play).toHaveBeenCalledTimes(2);
      unmount();

      vi.mocked(audio.play).mockClear();
      vi.mocked(audio.pause).mockClear();
      stateListener.mockClear();
      act(() => {
        emitPlayerEvent(PLAYER_EVENTS.PLAY);
        emitPlayerEvent(PLAYER_EVENTS.PAUSE);
      });
      expect(audio.play).not.toHaveBeenCalled();
      expect(audio.pause).not.toHaveBeenCalled();
      expect(stateListener).not.toHaveBeenCalled();
    } finally {
      unsubscribe();
    }
  });

  it("does not autoplay and follows play, pause, and ended events", () => {
    render(<AudioPlayer src="/audio/alpha.mp3" title="Alpha" />);
    const audio = audioElement();

    expect(audio.play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    expect(audio.play).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
    expect(audioElement()).toBe(audio);

    fireEvent.click(screen.getByRole("button", { name: "Tạm dừng" }));
    expect(audio.pause).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();

    act(() => {
      void audio.play();
    });
    expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
    finishTrack();
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();
    expect(audio.play).toHaveBeenCalledTimes(2);
  });

  it("reports a rejected play request and allows a successful retry", async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(
      new DOMException("Playback blocked", "NotAllowedError")
    );
    render(<AudioPlayer src="/audio/alpha.mp3" />);

    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Không thể phát bài nhạc");
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
  });

  it("uses metadata before playback, supports seeking, and rejects nonfinite durations", () => {
    render(<AudioPlayer src="/audio/alpha.mp3" />);
    const audio = audioElement();
    const slider = screen.getByRole("slider", { name: "Tiến độ phát nhạc" });

    expect(slider).toBeDisabled();
    expect(slider).toHaveAttribute("aria-valuetext", "0:00 / 0:00");
    setMetadata(audio, 150);
    expect(slider).toBeEnabled();
    expect(slider).toHaveAttribute("aria-valuetext", "0:00 / 2:30");

    fireEvent.change(slider, { target: { value: "50" } });
    expect(audio.currentTime).toBe(75);
    expect(slider).toHaveValue("50");
    expect(slider).toHaveAttribute("aria-valuetext", "1:15 / 2:30");
    fireEvent.change(slider, { target: { value: "100" } });
    expect(audio.currentTime).toBe(150);
    fireEvent.change(slider, { target: { value: "0" } });
    expect(audio.currentTime).toBe(0);

    for (const duration of [Number.NaN, Number.POSITIVE_INFINITY, -1, 0]) {
      setMetadata(audio, duration);
      expect(slider).toBeDisabled();
      expect(slider).toHaveAttribute("aria-valuetext", "0:00 / 0:00");
    }
    expect(audio.play).not.toHaveBeenCalled();
  });

  it("updates elapsed time and duration when the media reports changes", () => {
    render(<AudioPlayer src="/audio/alpha.mp3" />);
    const audio = audioElement();
    setMetadata(audio, 100);
    audio.currentTime = 25;
    fireEvent.timeUpdate(audio);
    const slider = screen.getByRole("slider", { name: "Tiến độ phát nhạc" });
    expect(slider).toHaveValue("25");
    expect(slider).toHaveAttribute("aria-valuetext", "0:25 / 1:40");

    Object.defineProperty(audio, "duration", { configurable: true, value: 200 });
    fireEvent.durationChange(audio);
    expect(slider).toHaveValue("12.5");
    expect(slider).toHaveAttribute("aria-valuetext", "0:25 / 3:20");
  });

  it("advances automatically at the end and stops after the final track", () => {
    render(<AudioPlayer playlist={playlist} />);
    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));

    finishTrack();
    expectTrack("Bravo", "/audio/bravo.mp3");
    expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
    finishTrack();
    expectTrack("Charlie", "/audio/charlie.mp3");
    finishTrack();
    expectTrack("Charlie", "/audio/charlie.mp3");
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);
  });

  it("repeats a single track using the native loop property", () => {
    render(<AudioPlayer src="/audio/alpha.mp3" />);
    const audio = audioElement();
    const repeat = screen.getByRole("button", { name: "Lặp bài nhạc" });

    expect(audio.loop).toBe(false);
    fireEvent.click(repeat);
    expect(repeat).toHaveAttribute("aria-pressed", "true");
    expect(audio.loop).toBe(true);
    fireEvent.click(repeat);
    expect(repeat).toHaveAttribute("aria-pressed", "false");
    expect(audio.loop).toBe(false);
    expect(screen.getByRole("button", { name: "Phát ngẫu nhiên" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Bài trước" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Bài tiếp theo" })).toBeDisabled();
  });

  it("repeats the entire playlist without looping an individual track", () => {
    render(<AudioPlayer playlist={playlist} />);
    fireEvent.click(screen.getByRole("button", { name: "Lặp danh sách" }));
    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));

    for (const nextTrack of [playlist[1], playlist[2], playlist[0]]) {
      expect(audioElement().loop).toBe(false);
      finishTrack();
      expectTrack(nextTrack.title!, nextTrack.src);
      expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
    }
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(4);
  });

  it("preserves paused or playing state during previous and next navigation", () => {
    render(<AudioPlayer playlist={playlist} />);
    fireEvent.click(screen.getByRole("button", { name: "Bài trước" }));
    expectTrack("Charlie", "/audio/charlie.mp3");
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    expectTrack("Alpha", "/audio/alpha.mp3");
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    const oldAudio = audioElement();
    setMetadata(oldAudio, 180, 30);
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    expectTrack("Bravo", "/audio/bravo.mp3");
    expect(oldAudio.paused).toBe(true);
    expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "0:00 / 0:00");
    fireEvent.click(screen.getByRole("button", { name: "Bài trước" }));
    expectTrack("Alpha", "/audio/alpha.mp3");
    expect(screen.getByRole("button", { name: "Tạm dừng" })).toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);

    fireEvent.click(screen.getByRole("button", { name: "Tạm dừng" }));
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    expectTrack("Bravo", "/audio/bravo.mp3");
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(3);
  });

  it("shuffles without interrupting the current track or repeating tracks in a cycle", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const tracks = [...playlist, { src: "/audio/delta.mp3", title: "Delta" }];
    render(<AudioPlayer playlist={tracks} />);
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    const currentAudio = audioElement();
    setMetadata(currentAudio, 180, 42);

    fireEvent.click(screen.getByRole("button", { name: "Phát ngẫu nhiên" }));
    expectTrack("Bravo", "/audio/bravo.mp3");
    expect(audioElement()).toBe(currentAudio);
    expect(currentAudio.currentTime).toBe(42);
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Phát ngẫu nhiên" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    const visited = [audioElement().getAttribute("src")];
    for (let index = 1; index < tracks.length; index += 1) {
      finishTrack();
      visited.push(audioElement().getAttribute("src"));
    }
    expect(new Set(visited).size).toBe(tracks.length);
    expect(visited).toEqual(expect.arrayContaining(tracks.map((track) => track.src)));
    finishTrack();
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(tracks.length);
  });

  it("restores playlist order when shuffle is disabled while keeping the current track", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<AudioPlayer playlist={playlist} />);
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    fireEvent.click(screen.getByRole("button", { name: "Phát ngẫu nhiên" }));
    const currentAudio = audioElement();
    fireEvent.click(screen.getByRole("button", { name: "Phát ngẫu nhiên" }));
    expect(audioElement()).toBe(currentAudio);
    expectTrack("Bravo", "/audio/bravo.mp3");
    expect(screen.getByRole("button", { name: "Phát ngẫu nhiên" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    expectTrack("Charlie", "/audio/charlie.mp3");
  });

  it("resets playback, timing, and repeat when the source changes", async () => {
    const { rerender } = render(<AudioPlayer src="/audio/alpha.mp3" title="Alpha" />);
    const oldAudio = audioElement();
    setMetadata(oldAudio, 120, 60);
    fireEvent.click(screen.getByRole("button", { name: "Lặp bài nhạc" }));
    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));

    rerender(<AudioPlayer src="/audio/bravo.mp3" title="Bravo" />);
    await waitFor(() => expect(screen.queryByRole("heading", { name: "Alpha" })).toBeNull());
    expectTrack("Bravo", "/audio/bravo.mp3");
    expect(oldAudio.paused).toBe(true);
    expect(audioElement().paused).toBe(true);
    expect(audioElement().loop).toBe(false);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "0:00 / 0:00");
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce();
  });

  it("resets the track and shuffle state when the playlist changes", async () => {
    const { rerender } = render(<AudioPlayer playlist={playlist} />);
    fireEvent.click(screen.getByRole("button", { name: "Bài tiếp theo" }));
    fireEvent.click(screen.getByRole("button", { name: "Phát ngẫu nhiên" }));
    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    const oldAudio = audioElement();

    rerender(<AudioPlayer playlist={[playlist[2], playlist[0]]} />);
    await waitFor(() => expect(screen.queryByRole("heading", { name: "Bravo" })).toBeNull());
    expectTrack("Charlie", "/audio/charlie.mp3");
    expect(oldAudio.paused).toBe(true);
    expect(screen.getByRole("button", { name: "Phát nhạc" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Phát ngẫu nhiên" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByText("Bài 1 / 2")).toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledOnce();
  });

  it("shows media errors and reloads the failed source before retrying", () => {
    render(<AudioPlayer src="/audio/alpha.mp3" />);
    const audio = audioElement();
    Object.defineProperty(audio, "error", { configurable: true, value: { code: 2 } });
    fireEvent.error(audio);
    expect(screen.getByRole("alert")).toHaveTextContent("Không thể tải bài nhạc");

    fireEvent.click(screen.getByRole("button", { name: "Phát nhạc" }));
    expect(audio.load).toHaveBeenCalledOnce();
    expect(audio.play).toHaveBeenCalledOnce();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders nothing for missing or blank sources and filters unplayable playlist entries", () => {
    const { rerender } = render(<AudioPlayer />);
    expect(screen.queryByRole("group", { name: "Trình phát nhạc" })).not.toBeInTheDocument();
    rerender(<AudioPlayer src="   " />);
    expect(screen.queryByRole("group", { name: "Trình phát nhạc" })).not.toBeInTheDocument();
    rerender(<AudioPlayer playlist={[{ src: "" }, { src: " " }]} />);
    expect(screen.queryByRole("group", { name: "Trình phát nhạc" })).not.toBeInTheDocument();
    rerender(<AudioPlayer playlist={[{ src: " " }, playlist[0]]} />);
    expectTrack("Alpha", "/audio/alpha.mp3");
    expect(screen.getByRole("button", { name: "Bài tiếp theo" })).toBeDisabled();
  });
});
