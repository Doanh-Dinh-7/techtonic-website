import { cn } from "@/shared/utils";

type WebGLFallbackProps = {
  className?: string;
  label?: string;
};

export function WebGLFallback({
  className,
  label = "TechTonic 3D experience fallback",
}: WebGLFallbackProps) {
  return (
    <div
      aria-label={label}
      className={cn(
        "relative min-h-[320px] overflow-hidden rounded-3xl border border-cyan-300/15 bg-[#0a0a0a]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,245,255,0.18),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.2),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(255,43,214,0.16),transparent_32%)]" />
      <div className="absolute inset-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl" />
    </div>
  );
}
