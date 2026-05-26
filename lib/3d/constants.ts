export const V2_COLORS = {
  background: "#0a0a0a",
  neonCyan: "#00f5ff",
  purple: "#a855f7",
  magenta: "#ff2bd6",
  electricBlue: "#3b82f6",
  glass: "rgba(255,255,255,0.06)",
} as const;

export const V2_GRADIENTS = {
  cyberAurora:
    "radial-gradient(circle at 20% 20%, rgba(0,245,255,0.18), transparent 35%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.2), transparent 30%), radial-gradient(circle at 50% 100%, rgba(255,43,214,0.14), transparent 32%)",
  glassBorder:
    "linear-gradient(135deg, rgba(0,245,255,0.45), rgba(168,85,247,0.2), rgba(255,43,214,0.35))",
} as const;

export const CAMERA_DEFAULTS = {
  position: [0, 0, 6] as [number, number, number],
  fov: 42,
  near: 0.1,
  far: 100,
} as const;
