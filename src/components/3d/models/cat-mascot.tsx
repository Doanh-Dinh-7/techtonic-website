"use client";

import { Float } from "@react-three/drei";
import { V2_COLORS } from "@/lib/3d/constants";

type CatMascotProps = {
  accentColor?: string;
};

export function CatMascot({ accentColor = V2_COLORS.magenta }: CatMascotProps) {
  return (
    <Float floatIntensity={0.45} rotationIntensity={0.25} speed={1.1}>
      <group scale={0.75}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial
            color="#101827"
            emissive={V2_COLORS.purple}
            emissiveIntensity={0.08}
            metalness={0.2}
            roughness={0.35}
          />
        </mesh>
        <mesh position={[-0.42, 0.58, 0]} rotation={[0, 0, 0.46]}>
          <coneGeometry args={[0.24, 0.46, 3]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} />
        </mesh>
        <mesh position={[0.42, 0.58, 0]} rotation={[0, 0, -0.46]}>
          <coneGeometry args={[0.24, 0.46, 3]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} />
        </mesh>
        <mesh position={[-0.24, 0.08, 0.62]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={V2_COLORS.neonCyan} emissive={V2_COLORS.neonCyan} />
        </mesh>
        <mesh position={[0.24, 0.08, 0.62]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color={V2_COLORS.neonCyan} emissive={V2_COLORS.neonCyan} />
        </mesh>
      </group>
    </Float>
  );
}
