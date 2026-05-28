"use client";

import { V2_COLORS } from "@/lib/3d/constants";
import { R3F_PERFORMANCE } from "@/lib/3d/performance";
import { CameraRig } from "@/components/3d/effects/camera-rig";
import { ParticleField } from "@/components/3d/effects/particle-field";
import { FloatingLogo } from "@/components/3d/models/floating-logo";

/**
 * Decorative home hero scene tuned for shared performance presets.
 */
export function HeroScene() {
  return (
    <CameraRig>
      <ambientLight intensity={0.62} />
      <pointLight color={V2_COLORS.neonCyan} intensity={2} position={[3, 3, 4]} />
      <pointLight color={V2_COLORS.purple} intensity={1.35} position={[-4, -1, 3]} />
      <ParticleField count={R3F_PERFORMANCE.particleCount.default} radius={7} />
      <FloatingLogo />
    </CameraRig>
  );
}
