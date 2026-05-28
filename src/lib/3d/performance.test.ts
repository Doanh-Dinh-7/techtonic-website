import { getSafeParticleCount, R3F_PERFORMANCE } from "@/lib/3d/performance";

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
