/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useHeroSection } from "./use-hero-section";

describe("useHeroSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("sets isLoaded after mount", () => {
    const { result } = renderHook(() => useHeroSection());

    expect(result.current.isLoaded).toBe(true);
  });

  it("exposes six hero images", () => {
    const { result } = renderHook(() => useHeroSection());

    expect(result.current.heroImages).toHaveLength(6);
    expect(result.current.currentHeroImage).toBe(0);
  });

  it("rotates hero image on interval", () => {
    const { result } = renderHook(() => useHeroSection());

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.currentHeroImage).toBe(1);
  });

  it("scrolls to core-values section when present", () => {
    const scrollIntoView = vi.fn();
    const section = document.createElement("section");
    section.id = "core-values";
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);

    const { result } = renderHook(() => useHeroSection());

    act(() => {
      result.current.scrollToNext();
    });

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    section.remove();
  });
});
