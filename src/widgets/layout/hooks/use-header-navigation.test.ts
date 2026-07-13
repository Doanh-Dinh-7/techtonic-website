/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useHeaderNavigation } from "./use-header-navigation";

describe("useHeaderNavigation", () => {
  const originalRegisterUrl = process.env.NEXT_PUBLIC_REGISTER_URL;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (originalRegisterUrl === undefined) {
      delete process.env.NEXT_PUBLIC_REGISTER_URL;
    } else {
      process.env.NEXT_PUBLIC_REGISTER_URL = originalRegisterUrl;
    }
  });

  it("marks home as active only on exact pathname", () => {
    const { result: home } = renderHook(() => useHeaderNavigation({ pathname: "/" }));
    const { result: about } = renderHook(() => useHeaderNavigation({ pathname: "/about" }));

    expect(home.current.isNavActive("/")).toBe(true);
    expect(home.current.isNavActive("/about")).toBe(false);
    expect(about.current.isNavActive("/")).toBe(false);
    expect(about.current.isNavActive("/about")).toBe(true);
  });

  it("treats nested paths as active for section routes", () => {
    const { result } = renderHook(() => useHeaderNavigation({ pathname: "/events/workshop" }));

    expect(result.current.isNavActive("/events")).toBe(true);
    expect(result.current.isNavActive("/recruitment")).toBe(false);
  });

  it("opens external register URL when configured", () => {
    process.env.NEXT_PUBLIC_REGISTER_URL = "https://forms.example/register";
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    const { result } = renderHook(() => useHeaderNavigation({ pathname: "/" }));

    expect(result.current.hasRegisterUrl).toBe(true);

    act(() => {
      result.current.handleJoinClick();
    });

    expect(openSpy).toHaveBeenCalledWith(
      "https://forms.example/register",
      "_blank",
      "noopener,noreferrer"
    );

    openSpy.mockRestore();
  });

  it("navigates to recruitment when register URL is missing", () => {
    delete process.env.NEXT_PUBLIC_REGISTER_URL;
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    let navigatedTo = "";
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...window.location,
        pathname: "/",
        set href(value: string) {
          navigatedTo = value;
        },
        get href() {
          return navigatedTo || "http://localhost/";
        },
      },
    });

    const { result } = renderHook(() => useHeaderNavigation({ pathname: "/" }));

    expect(result.current.hasRegisterUrl).toBe(false);

    act(() => {
      result.current.handleJoinClick();
    });

    expect(openSpy).not.toHaveBeenCalled();
    expect(navigatedTo).toBe("/recruitment");

    openSpy.mockRestore();
  });

  it("tracks mobile menu open state", () => {
    const { result } = renderHook(() => useHeaderNavigation({ pathname: "/" }));

    expect(result.current.mobileMenuOpen).toBe(false);

    act(() => {
      result.current.setMobileMenuOpen(true);
    });

    expect(result.current.mobileMenuOpen).toBe(true);
  });
});
