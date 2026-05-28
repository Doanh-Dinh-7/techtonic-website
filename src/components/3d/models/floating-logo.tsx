"use client";

import { Float, Text } from "@react-three/drei";
import { V2_COLORS } from "@/lib/3d/constants";

type FloatingLogoProps = {
  text?: string;
  color?: string;
};

export function FloatingLogo({
  text = "TT",
  color = V2_COLORS.neonCyan,
}: FloatingLogoProps) {
  return (
    <Float floatIntensity={0.65} rotationIntensity={0.45} speed={1.4}>
      <group rotation={[0.08, -0.28, 0]}>
        <mesh position={[0, 0, -0.12]}>
          <torusKnotGeometry args={[1.08, 0.08, 140, 12]} />
          <meshStandardMaterial
            color={V2_COLORS.purple}
            emissive={V2_COLORS.purple}
            emissiveIntensity={0.2}
            metalness={0.4}
            roughness={0.22}
          />
        </mesh>
        <Text
          anchorX="center"
          anchorY="middle"
          fontSize={0.54}
          position={[-0.58, -0.28, 0]}
        >
          {text}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            metalness={0.5}
            roughness={0.18}
          />
        </Text>
      </group>
    </Float>
  );
}
