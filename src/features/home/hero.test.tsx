/**
 * @vitest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Hero } from "./hero";

const mockUse3d = vi.fn();

vi.mock("@/hooks/use3d", () => ({
  use3d: () => mockUse3d(),
}));

vi.mock("@/3d/hero-media", () => ({
  HeroCanvasWithScene: () => <div data-testid="hero-3d-canvas" />,
}));

vi.mock("@/features/home/hooks/use-hero-section", () => ({
  useHeroSection: () => ({
    currentHeroImage: 0,
    heroImages: ["/a.webp"],
    heroRef: { current: null },
    heroScale: 0,
    heroY: 0,
    isLoaded: true,
    scrollToNext: vi.fn(),
  }),
}));

describe("Hero", () => {
  beforeEach(() => {
    mockUse3d.mockReturnValue({
      reducedMotion: false,
      supportsWebGL: true,
      isReady: true,
      shouldRenderMotion: false,
    });
  });

  it("renders image carousel when 3D motion is disabled", () => {
    render(<Hero />);
    expect(screen.getByRole("img", { name: /TechTonic Club Activities/i })).toBeTruthy();
    expect(screen.queryByTestId("hero-3d-canvas")).toBeNull();
  });

  it("renders 3D canvas when shouldRenderMotion is true", () => {
    mockUse3d.mockReturnValue({
      reducedMotion: false,
      supportsWebGL: true,
      isReady: true,
      shouldRenderMotion: true,
    });

    render(<Hero />);

    expect(screen.queryByRole("img", { name: /TechTonic Club Activities/i })).toBeNull();
    expect(screen.getByTestId("hero-3d-canvas")).toBeTruthy();
  });
});
