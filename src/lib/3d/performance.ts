export const R3F_PERFORMANCE = {
  dpr: [1, 1.5] as [number, number],
  frameloop: "always" as const,
  reducedMotionFrameloop: "demand" as const,
  stars: {
    count: {
      default: 650,
      reduced: 180,
    },
    speed: {
      default: 0.28,
      reduced: 0.08,
    },
  },
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
