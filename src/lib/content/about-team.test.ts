import { describe, expect, it } from "vitest";

import {
  aboutTeamTerms,
  getAboutTeamTermIdForDate,
  resolveDefaultAboutTeamTermId,
} from "./about-team";

describe("getAboutTeamTermIdForDate", () => {
  it("maps Jan–Aug to end-of-term academic year (year-1 – year)", () => {
    expect(getAboutTeamTermIdForDate(new Date(2026, 5, 10))).toBe("2025-2026"); // June
    expect(getAboutTeamTermIdForDate(new Date(2026, 0, 1))).toBe("2025-2026"); // January
    expect(getAboutTeamTermIdForDate(new Date(2026, 7, 31))).toBe("2025-2026"); // August
  });

  it("maps Sep–Dec to start-of-term academic year (year – year+1)", () => {
    expect(getAboutTeamTermIdForDate(new Date(2026, 9, 1))).toBe("2026-2027"); // October
    expect(getAboutTeamTermIdForDate(new Date(2026, 8, 1))).toBe("2026-2027"); // September
    expect(getAboutTeamTermIdForDate(new Date(2026, 11, 31))).toBe("2026-2027"); // December
  });
});

describe("resolveDefaultAboutTeamTermId", () => {
  it("returns preferred id when term exists in data", () => {
    expect(resolveDefaultAboutTeamTermId(aboutTeamTerms, new Date(2026, 5, 10))).toBe("2025-2026");
    expect(resolveDefaultAboutTeamTermId(aboutTeamTerms, new Date(2026, 9, 1))).toBe("2026-2027");
  });

  it("falls back to latest available term when preferred is in the future", () => {
    expect(resolveDefaultAboutTeamTermId(aboutTeamTerms, new Date(2030, 5, 1))).toBe("2026-2027");
  });

  it("falls back to earliest academic term when preferred is before data", () => {
    expect(resolveDefaultAboutTeamTermId(aboutTeamTerms, new Date(2020, 5, 1))).toBe("2024-2025");
  });
});
