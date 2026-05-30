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
  HeroCanvasShell: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="hero-3d-canvas">{children}</div>
  ),
  HeroSceneLazy: () => null,
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

vi.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        function MotionStub({
          children,
          ...props
        }: React.PropsWithChildren<Record<string, unknown>>) {
          return (
            <div data-motion={tag} {...props}>
              {children}
            </div>
          );
        },
    }
  );
  return { motion, AnimatePresence: ({ children }: { children: React.ReactNode }) => children };
});

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
    expect(screen.getByRole("img", { name: /TechTonic Club Activities/i })).toBeInTheDocument();
    expect(screen.queryByTestId("hero-3d-canvas")).not.toBeInTheDocument();
  });

  it("renders 3D canvas when shouldRenderMotion is true", () => {
    mockUse3d.mockReturnValue({
      reducedMotion: false,
      supportsWebGL: true,
      isReady: true,
      shouldRenderMotion: true,
    });

    render(<Hero />);

    expect(
      screen.queryByRole("img", { name: /TechTonic Club Activities/i })
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("hero-3d-canvas")).toBeInTheDocument();
  });
});
