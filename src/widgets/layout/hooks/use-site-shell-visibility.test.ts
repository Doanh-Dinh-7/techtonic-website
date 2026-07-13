/**
 * @vitest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSiteShellVisibility } from "./use-site-shell-visibility";

describe("useSiteShellVisibility", () => {
  it("shows header and back-to-top immediately on inner pages", () => {
    const { result } = renderHook(() => useSiteShellVisibility(false));

    expect(result.current.showHeader).toBe(true);
    expect(result.current.showBackToTop).toBe(true);
  });

  it("hides chrome on home until scrolled past hero", () => {
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
      writable: true,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
      writable: true,
    });

    const { result } = renderHook(() => useSiteShellVisibility(true));

    expect(result.current.showHeader).toBe(false);
    expect(result.current.showBackToTop).toBe(false);
  });
});
