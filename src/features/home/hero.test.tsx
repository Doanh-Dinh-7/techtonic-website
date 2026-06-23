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
  HeroRubiksCube: () => <div data-testid="hero-rubiks-cube" />,
}));

vi.mock("@/features/home/hooks/use-hero-section", () => ({
  useHeroSection: () => ({
    currentHeroImage: 0,
    heroImages: ["/a.webp"],
    heroRef: { current: null },
    heroScale: 0,
    heroY: 0,
    isLoaded: true,
    shouldMountRubik: true,
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

  it("renders WebGL fallback when 3D motion is disabled", () => {
    render(<Hero />);
    expect(screen.getByLabelText(/TechTonic 3D experience fallback/i)).toBeTruthy();
    expect(screen.queryByTestId("hero-rubiks-cube")).toBeNull();
  });

  it("renders Rubik's cube when shouldRenderMotion is true", () => {
    mockUse3d.mockReturnValue({
      reducedMotion: false,
      supportsWebGL: true,
      isReady: true,
      shouldRenderMotion: true,
    });

    render(<Hero />);

    expect(screen.queryByLabelText(/TechTonic 3D experience fallback/i)).toBeNull();
    expect(screen.getByTestId("hero-rubiks-cube")).toBeTruthy();
  });
});
