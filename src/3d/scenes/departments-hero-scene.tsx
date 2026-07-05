"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Line } from "three";

import { useReducedMotionPreference } from "@/hooks/use3d";

const DEPT_COLORS = {
  events: "#ef4444",
  hr: "#eab308",
  media: "#22c55e",
  tech: "#f97316",
  bcn: "#a855f7",
  advisor: "#3b82f6",
} as const;

type NodeConfig = {
  id: string;
  color: string;
  position: [number, number, number];
  size: number;
};

const CENTER_NODE: NodeConfig = {
  id: "bcn",
  color: DEPT_COLORS.bcn,
  position: [0, 0.2, 0],
  size: 0.62,
};

const DEPARTMENT_NODES: NodeConfig[] = [
  { id: "events", color: DEPT_COLORS.events, position: [-2.4, 0.9, 0.15], size: 0.48 },
  { id: "hr", color: DEPT_COLORS.hr, position: [-1.2, -1.35, 0.25], size: 0.48 },
  { id: "media", color: DEPT_COLORS.media, position: [1.2, -1.35, -0.1], size: 0.48 },
  { id: "tech", color: DEPT_COLORS.tech, position: [2.4, 0.9, 0.05], size: 0.48 },
];

const ADVISOR_NODE: NodeConfig = {
  id: "advisor",
  color: DEPT_COLORS.advisor,
  position: [0, -2.15, 0],
  size: 0.42,
};

function OrgNode({
  node,
  paused,
  phase = 0,
}: {
  node: NodeConfig;
  paused: boolean;
  phase?: number;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (paused || !ref.current) return;
    const t = state.clock.elapsedTime + phase;
    ref.current.position.y = node.position[1] + Math.sin(t * 0.9) * 0.07;
  });

  const [w, h, d] = [node.size, node.size * 0.72, node.size * 0.38];

  return (
    <group ref={ref} position={node.position}>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.22} />
      </mesh>
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshBasicMaterial color={node.color} wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function OrgConnections({
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
          color: DEPT_COLORS.bcn,
          transparent: true,
          opacity: 0.18,
        });
        const line = new Line(geometry, material);
        line.userData.index = index;
        return line;
      }),
    [from, targets]
  );

  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (paused) return;
    const pulse = 0.14 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
    lines.forEach((line) => {
      const material = line.material as LineBasicMaterial;
      material.opacity = pulse;
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((line) => (
        <primitive key={line.userData.index as number} object={line} />
      ))}
    </group>
  );
}

function OrbitRing({ paused }: { paused: boolean }) {
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (paused || !ref.current) return;
    ref.current.rotation.z += 0.0008;
    ref.current.rotation.x = 0.35;
  });

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[3.1, 0.01, 8, 96]} />
        <meshBasicMaterial color={DEPT_COLORS.advisor} transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.35, 0.008, 8, 96]} />
        <meshBasicMaterial color={DEPT_COLORS.bcn} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function DepartmentsHeroScene() {
  const reducedMotion = useReducedMotionPreference();
  const groupRef = useRef<Group>(null);

  const connectionTargets = useMemo(
    () => [...DEPARTMENT_NODES.map((n) => n.position), ADVISOR_NODE.position],
    []
  );

  useFrame(() => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += 0.0012;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.18} enabled={!reducedMotion}>
      <group ref={groupRef}>
        <OrbitRing paused={reducedMotion} />
        <OrgConnections
          from={CENTER_NODE.position}
          targets={connectionTargets}
          paused={reducedMotion}
        />
        <OrgNode node={CENTER_NODE} paused={reducedMotion} />
        {DEPARTMENT_NODES.map((node, index) => (
          <OrgNode key={node.id} node={node} paused={reducedMotion} phase={index * 0.7} />
        ))}
        <OrgNode node={ADVISOR_NODE} paused={reducedMotion} phase={2.1} />
      </group>
    </Float>
  );
}
