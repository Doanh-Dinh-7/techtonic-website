"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { V2_COLORS } from "@/lib/3d/constants";
import { useReducedMotionPreference } from "@/hooks/use3d";

function WireShape({
  geometry,
  color,
  position,
  rotationSpeed,
  paused,
}: {
  geometry: "icosahedron" | "octahedron";
  color: string;
  position: [number, number, number];
  rotationSpeed: [number, number];
  paused: boolean;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (paused || !ref.current) return;
    ref.current.rotation.x += rotationSpeed[0];
    ref.current.rotation.y += rotationSpeed[1];
  });

  return (
    <mesh ref={ref} position={position}>
      {geometry === "icosahedron" ? (
        <icosahedronGeometry args={[2, 0]} />
      ) : (
        <octahedronGeometry args={[3, 0]} />
      )}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={geometry === "icosahedron" ? 0.15 : 0.1}
      />
    </mesh>
  );
}

export function EventsHeroScene() {
  const reducedMotion = useReducedMotionPreference();

  return (
    <>
      <WireShape
        geometry="icosahedron"
        color={V2_COLORS.neonCyan}
        position={[0, 0, 0]}
        rotationSpeed={[0.002, 0.003]}
        paused={reducedMotion}
      />
      <WireShape
        geometry="octahedron"
        color={V2_COLORS.purple}
        position={[0, 0, 0]}
        rotationSpeed={[-0.001, -0.002]}
        paused={reducedMotion}
      />
    </>
  );
}
