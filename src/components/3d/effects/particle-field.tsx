"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Points } from "three";
import { V2_COLORS } from "@/lib/3d/constants";
import { getSafeParticleCount } from "@/lib/3d/performance";
import { useReducedMotionPreference } from "@/hooks/use3d";

type ParticleFieldProps = {
  count?: number;
  color?: string;
  radius?: number;
  speed?: number;
};

export function ParticleField({
  count,
  color = V2_COLORS.neonCyan,
  radius = 7,
  speed = 0.08,
}: ParticleFieldProps) {
  const reducedMotion = useReducedMotionPreference();
  const pointsRef = React.useRef<Points>(null);
  const safeCount = getSafeParticleCount(count, reducedMotion);

  const positions = React.useMemo(() => {
    const values = new Float32Array(safeCount * 3);

    for (let index = 0; index < safeCount; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * radius * 2;
      values[index * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      values[index * 3 + 2] = (Math.random() - 0.5) * radius * 2;
    }

    return values;
  }, [radius, safeCount]);

  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;

    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x += delta * speed * 0.25;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        blending={AdditiveBlending}
        color={color}
        depthWrite={false}
        opacity={0.75}
        size={0.026}
        transparent
      />
    </points>
  );
}
