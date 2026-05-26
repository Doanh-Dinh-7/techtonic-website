export const R3F_PERFORMANCE = {
  dpr: [1, 1.5] as [number, number],
  frameloop: "always" as const,
  reducedMotionFrameloop: "demand" as const,
  particleCount: {
    default: 700,
    reduced: 120,
  },
} as const;

export function getSafeParticleCount(count?: number, reducedMotion?: boolean) {
  if (typeof count === "number") {
    return reducedMotion ? Math.min(count, R3F_PERFORMANCE.particleCount.reduced) : count;
  }

  return reducedMotion
    ? R3F_PERFORMANCE.particleCount.reduced
    : R3F_PERFORMANCE.particleCount.default;
}
