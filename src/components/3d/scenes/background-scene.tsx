"use client";

import { Stars } from "@react-three/drei";
import { useReducedMotionPreference } from "@/hooks/use3d";
import { V2_COLORS } from "@/lib/3d/constants";
import { R3F_PERFORMANCE } from "@/lib/3d/performance";
import { CameraRig } from "@/components/3d/effects/camera-rig";
import { ParticleField } from "@/components/3d/effects/particle-field";

/**
 * Ambient background scene with reduced-motion aware defaults.
 */
export function BackgroundScene() {
  const reducedMotion = useReducedMotionPreference();
  const starCount = reducedMotion
    ? R3F_PERFORMANCE.stars.count.reduced
    : R3F_PERFORMANCE.stars.count.default;
  const starSpeed = reducedMotion
    ? R3F_PERFORMANCE.stars.speed.reduced
    : R3F_PERFORMANCE.stars.speed.default;

  return (
    <CameraRig intensity={0.22}>
      <ambientLight intensity={0.55} />
      <pointLight color={V2_COLORS.neonCyan} intensity={1.6} position={[3, 2, 4]} />
      <pointLight color={V2_COLORS.magenta} intensity={1.1} position={[-3, -2, 3]} />
      <Stars count={starCount} depth={22} factor={2.4} fade radius={42} speed={starSpeed} />
      <ParticleField
        color={V2_COLORS.neonCyan}
        count={reducedMotion ? R3F_PERFORMANCE.particleCount.reduced : 520}
        radius={6.5}
      />
    </CameraRig>
  );
}
