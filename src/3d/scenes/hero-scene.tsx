"use client";

import { V2_COLORS } from "@/lib/3d/constants";
import { CameraRig } from "@/3d/effects/camera-rig";
import { ParticleField } from "@/3d/effects/particle-field";
import { FloatingLogo } from "@/3d/models/floating-logo";

export function HeroScene() {
  return (
    <CameraRig>
      <ambientLight intensity={0.62} />
      <pointLight color={V2_COLORS.neonCyan} intensity={2} position={[3, 3, 4]} />
      <pointLight color={V2_COLORS.purple} intensity={1.35} position={[-4, -1, 3]} />
      <ParticleField count={700} radius={7} />
      <FloatingLogo />
    </CameraRig>
  );
}
