"use client";

import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial } from "three";

import { ParticleField } from "@/3d/effects/particle-field";
import { V2_COLORS } from "@/lib/3d/constants";
import { getSafeStarCount, getSafeStarSpeed } from "@/lib/3d/performance";
import { useReducedMotionPreference } from "@/hooks/use3d";

const STEP_NODES: Array<{
  position: [number, number, number];
  color: string;
  size: number;
}> = [
  { position: [-2.2, 2.5, 0.1], color: V2_COLORS.neonCyan, size: 0.42 },
  { position: [0, 2.8, -0.05], color: V2_COLORS.purple, size: 0.48 },
  { position: [2.2, 2.5, 0.08], color: V2_COLORS.neonCyan, size: 0.42 },
];

const ROUND_NODES: Array<{
  position: [number, number, number];
  color: string;
}> = [
  { position: [-1.8, -0.5, 0.12], color: V2_COLORS.neonCyan },
  { position: [0, -0.35, -0.08], color: V2_COLORS.purple },
  { position: [1.8, -0.5, 0.1], color: V2_COLORS.magenta },
];

const ROUND_CENTER: [number, number, number] = [0, -0.5, 0];

function WireStepNode({
  position,
  color,
  size,
  paused,
  phase = 0,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  paused: boolean;
  phase?: number;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (paused || !ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.y = position[1] + Math.sin(t * 0.85) * 0.06;
    ref.current.rotation.y += 0.002;
    ref.current.rotation.x += 0.001;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={[size, size * 0.85, size * 0.4]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 0.55, 12, 12]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function RoundNode({
  position,
  color,
  paused,
  phase = 0,
}: {
  position: [number, number, number];
  color: string;
  paused: boolean;
  phase?: number;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (paused || !ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.04;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function RoundConnections({
  from,
  targets,
  paused,
}: {
  from: [number, number, number];
  targets: [number, number, number][];
  paused: boolean;
}) {
  const lines = useMemo(
    () =>
      targets.map((to, index) => {
        const geometry = new BufferGeometry();
        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(new Float32Array([...from, ...to]), 3)
        );
        const material = new LineBasicMaterial({
          color: V2_COLORS.purple,
          transparent: true,
          opacity: 0.14,
        });
        const line = new Line(geometry, material);
        line.userData.index = index;
        return line;
      }),
    [from, targets]
  );

  useFrame((state) => {
    if (paused) return;
    const pulse = 0.1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    lines.forEach((line) => {
      const material = line.material as LineBasicMaterial;
      material.opacity = pulse;
    });
  });

  return (
    <group>
      {lines.map((line) => (
        <primitive key={line.userData.index as number} object={line} />
      ))}
    </group>
  );
}

function FaqOrbitRing({ paused }: { paused: boolean }) {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (paused || !ref.current) return;
    ref.current.rotation.z += 0.0006;
    ref.current.rotation.x = 0.42;
  });

  return (
    <group ref={ref} position={[0, -3.5, 0]}>
      <mesh>
        <torusGeometry args={[2.4, 0.01, 8, 72]} />
        <meshBasicMaterial color={V2_COLORS.neonCyan} transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.65, 0.008, 8, 72]} />
        <meshBasicMaterial color={V2_COLORS.purple} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function RecruitmentPageScene() {
  const reducedMotion = useReducedMotionPreference();
  const starCount = getSafeStarCount(350, reducedMotion);
  const starSpeed = getSafeStarSpeed(undefined, reducedMotion);

  const roundTargets = useMemo(() => ROUND_NODES.map((n) => n.position), []);

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight color={V2_COLORS.neonCyan} intensity={1.2} position={[3, 2, 4]} />
      <pointLight color={V2_COLORS.purple} intensity={0.9} position={[-3, -1, 3]} />
      <Stars count={starCount} depth={22} factor={2.2} fade radius={40} speed={starSpeed} />
      <ParticleField color={V2_COLORS.neonCyan} count={300} radius={6} speed={0.06} />

      <Float speed={1} rotationIntensity={0.06} floatIntensity={0.14} enabled={!reducedMotion}>
        <group>
          {STEP_NODES.map((node, index) => (
            <WireStepNode
              key={index}
              position={node.position}
              color={node.color}
              size={node.size}
              paused={reducedMotion}
              phase={index * 0.9}
            />
          ))}

          <RoundConnections from={ROUND_CENTER} targets={roundTargets} paused={reducedMotion} />
          {ROUND_NODES.map((node, index) => (
            <RoundNode
              key={index}
              position={node.position}
              color={node.color}
              paused={reducedMotion}
              phase={index * 0.6}
            />
          ))}

          <FaqOrbitRing paused={reducedMotion} />
        </group>
      </Float>
    </>
  );
}
