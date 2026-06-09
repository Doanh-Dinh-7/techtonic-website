/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useAboutTeamTabs } from "./use-about-team-tabs";

describe("useAboutTeamTabs", () => {
  it("defaults to 2024-2025 term and ban chu nhiem board", () => {
    const { result } = renderHook(() => useAboutTeamTabs());

    expect(result.current.termId).toBe("2024-2025");
    expect(result.current.boardId).toBe("ban-chu-nhiem");
    expect(result.current.activeBoard?.label).toBe("Ban Chủ nhiệm");
  });

  it("resets board when switching term", () => {
    const { result } = renderHook(() => useAboutTeamTabs());

    act(() => {
      result.current.selectBoard("ban-su-kien");
    });
    expect(result.current.boardId).toBe("ban-su-kien");

    act(() => {
      result.current.selectTerm("founders");
    });
    expect(result.current.termId).toBe("founders");
    expect(result.current.boardId).toBe("founders-all");
  });

  it("selects a board within the active term", () => {
    const { result } = renderHook(() => useAboutTeamTabs());

    act(() => {
      result.current.selectBoard("ban-truyen-thong");
    });

    expect(result.current.activeBoard?.label).toBe("Ban Truyền thông");
  });
});
