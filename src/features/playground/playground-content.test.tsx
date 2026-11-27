/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LIVE_PUZZLE_URL, liveGesturePuzzle } from "@/lib/content/playground";
import { PlaygroundContent } from "./playground-content";

describe("PlaygroundContent", () => {
  it("renders heading and pre-start curtain without mounting iframe initially", () => {
    render(<PlaygroundContent />);

    expect(
      screen.getByRole("heading", { level: 1, name: liveGesturePuzzle.title })
    ).toBeInTheDocument();
    expect(screen.queryByTitle(liveGesturePuzzle.iframeTitle)).not.toBeInTheDocument();

    const externalLink = screen.getByRole("link", { name: /Mở toàn màn hình/i });
    expect(externalLink).toHaveAttribute("href", LIVE_PUZZLE_URL);
    expect(externalLink).toHaveAttribute("target", "_blank");
    expect(externalLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("mounts iframe with camera permission on launch and unmounts on close", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    render(<PlaygroundContent />);

    await user.click(screen.getByRole("button", { name: /Bắt đầu chơi ngay/i }));

    const iframe = screen.getByTitle(liveGesturePuzzle.iframeTitle);
    expect(iframe).toHaveAttribute("src", LIVE_PUZZLE_URL);
    expect(iframe.getAttribute("allow")).toContain("camera");

    await user.click(screen.getByRole("button", { name: /Đóng khung game/i }));

    expect(screen.queryByTitle(liveGesturePuzzle.iframeTitle)).not.toBeInTheDocument();
  });
});
