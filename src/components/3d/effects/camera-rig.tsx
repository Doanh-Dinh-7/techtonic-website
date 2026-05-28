"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useReducedMotionPreference } from "@/hooks/use3d";

type CameraRigProps = {
  children?: React.ReactNode;
  intensity?: number;
};

export function CameraRig({ children, intensity = 0.35 }: CameraRigProps) {
  const reducedMotion = useReducedMotionPreference();

  useFrame(({ camera, pointer }, delta) => {
    if (reducedMotion) return;

    camera.position.x = MathUtils.damp(camera.position.x, pointer.x * intensity, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, pointer.y * intensity, 3, delta);
    camera.lookAt(0, 0, 0);
  });

  return <>{children}</>;
}
