/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useHeroSection } from "./use-hero-section";

describe("useHeroSection", () => {
  it("sets isLoaded after mount", () => {
    const { result } = renderHook(() => useHeroSection());

    expect(result.current.isLoaded).toBe(true);
  });

  it("defers Rubik mount until the first user interaction", () => {
    const { result } = renderHook(() => useHeroSection());

    expect(result.current.shouldMountRubik).toBe(false);

    act(() => {
      window.dispatchEvent(new Event("pointermove"));
    });

    expect(result.current.shouldMountRubik).toBe(true);
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
