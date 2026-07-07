/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { homeActivities } from "@/lib/content/home-activities";

import { Activities } from "./activities";

vi.mock("@/hooks/use3d", () => ({
  use3d: () => ({
    reducedMotion: false,
    supportsWebGL: true,
    isReady: true,
    shouldRenderMotion: false,
  }),
  useReducedMotionPreference: () => false,
}));

describe("Activities", () => {
  it("renders the section heading and all activity cards", () => {
    render(<Activities />);

    expect(screen.getByRole("heading", { name: /Các hoạt động nổi bật/i })).toBeInTheDocument();

    expect(screen.getAllByRole("article")).toHaveLength(homeActivities.length);

    homeActivities.forEach((activity) => {
      expect(screen.getByRole("img", { name: activity.imageAlt })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: activity.title })).toBeInTheDocument();
    });
  });
});
