import {
  getSafeParticleCount,
  getSafeStarCount,
  getSafeStarSpeed,
  R3F_PERFORMANCE,
} from "@/lib/3d/performance";

describe("getSafeParticleCount", () => {
  it("returns default count when reduced motion is off", () => {
    expect(getSafeParticleCount(undefined, false)).toBe(R3F_PERFORMANCE.particleCount.default);
  });

  it("returns reduced count when reduced motion is on", () => {
    expect(getSafeParticleCount(undefined, true)).toBe(R3F_PERFORMANCE.particleCount.reduced);
  });

  it("caps explicit count under reduced motion", () => {
    expect(getSafeParticleCount(700, true)).toBe(R3F_PERFORMANCE.particleCount.reduced);
  });

  it("keeps explicit count when reduced motion is off", () => {
    expect(getSafeParticleCount(240, false)).toBe(240);
  });
});

describe("getSafeStarCount", () => {
  it("returns default star count when reduced motion is off", () => {
    expect(getSafeStarCount(undefined, false)).toBe(R3F_PERFORMANCE.stars.count.default);
  });

  it("returns reduced star count when reduced motion is on", () => {
    expect(getSafeStarCount(undefined, true)).toBe(R3F_PERFORMANCE.stars.count.reduced);
  });

  it("caps explicit star count under reduced motion", () => {
    expect(getSafeStarCount(650, true)).toBe(R3F_PERFORMANCE.stars.count.reduced);
  });
});

describe("getSafeStarSpeed", () => {
  it("returns configured speed when motion is allowed", () => {
    expect(getSafeStarSpeed(0.28, false)).toBe(0.28);
  });

  it("returns reduced speed when reduced motion is on", () => {
    expect(getSafeStarSpeed(0.28, true)).toBe(R3F_PERFORMANCE.stars.speed.reduced);
  });
});
