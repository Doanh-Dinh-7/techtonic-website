import { MeshStandardMaterial, PointsMaterial } from "three";
import { V2_COLORS } from "@/lib/3d/constants";

export function createNeonSurfaceMaterial(color = V2_COLORS.neonCyan) {
  return new MeshStandardMaterial({
    color,
    metalness: 0.55,
    roughness: 0.2,
    emissive: color,
    emissiveIntensity: 0.18,
  });
}

export function createParticleMaterial(color = V2_COLORS.neonCyan) {
  return new PointsMaterial({
    color,
    size: 0.025,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
}
