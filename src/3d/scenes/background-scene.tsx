"use client";

import { Stars } from "@react-three/drei";
import { V2_COLORS } from "@/lib/3d/constants";
import { getSafeStarCount, getSafeStarSpeed, R3F_PERFORMANCE } from "@/lib/3d/performance";
import { useReducedMotionPreference } from "@/hooks/use3d";
import { CameraRig } from "@/3d/effects/camera-rig";
import { ParticleField } from "@/3d/effects/particle-field";

export function BackgroundScene() {
  const reducedMotion = useReducedMotionPreference();
  const starCount = getSafeStarCount(R3F_PERFORMANCE.stars.count.default, reducedMotion);
  const starSpeed = getSafeStarSpeed(R3F_PERFORMANCE.stars.speed.default, reducedMotion);

  return (
    <CameraRig intensity={0.22}>
      <ambientLight intensity={0.55} />
      <pointLight color={V2_COLORS.neonCyan} intensity={1.6} position={[3, 2, 4]} />
      <pointLight color={V2_COLORS.magenta} intensity={1.1} position={[-3, -2, 3]} />
      <Stars count={starCount} depth={22} factor={2.4} fade radius={42} speed={starSpeed} />
      <ParticleField color={V2_COLORS.neonCyan} count={520} radius={6.5} />
    </CameraRig>
  );
}
