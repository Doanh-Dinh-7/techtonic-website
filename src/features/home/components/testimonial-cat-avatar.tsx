import type { TestimonialCatVariant } from "@/lib/content/home";
import { cn } from "@/shared/utils";

const accentColors: Record<TestimonialCatVariant, { stroke: string; ear: string; mouth: string }> =
  {
    cyan: { stroke: "#00f5ff", ear: "#00f5ff", mouth: "#00f5ff" },
    purple: { stroke: "#a855f7", ear: "#a855f7", mouth: "#a855f7" },
    magenta: { stroke: "#ff2bd6", ear: "#ff2bd6", mouth: "#ff2bd6" },
  };

const ringClasses: Record<TestimonialCatVariant, string> = {
  cyan: "ring-neon-cyan/40",
  purple: "ring-neon-purple/40",
  magenta: "ring-fuchsia-400/40",
};

type TestimonialCatAvatarProps = {
  variant: TestimonialCatVariant;
  name: string;
  className?: string;
};

export function TestimonialCatAvatar({ variant, name, className }: TestimonialCatAvatarProps) {
  const accent = accentColors[variant];
  const gradientId = `cat-bg-${variant}`;
  const glowId = `cat-glow-${variant}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width={80}
      height={80}
      role="img"
      aria-label={`Mascot meo TechTonic — ${name}`}
      className={cn("mx-auto mb-6 h-20 w-20 rounded-full ring-2", ringClasses[variant], className)}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1a1f2e" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="40"
        cy="40"
        r="38"
        fill={`url(#${gradientId})`}
        stroke={accent.stroke}
        strokeOpacity={0.45}
        strokeWidth={2}
      />
      <path d="M18 28 L26 14 L34 28 Z" fill={accent.ear} fillOpacity={0.85} />
      <path d="M46 28 L54 14 L62 28 Z" fill={accent.ear} fillOpacity={0.85} />
      <ellipse cx="40" cy="44" rx="22" ry="20" fill="#101827" />
      <circle cx="31" cy="42" r="4" fill="#00f5ff" filter={`url(#${glowId})`} />
      <circle cx="49" cy="42" r="4" fill="#00f5ff" filter={`url(#${glowId})`} />
      <ellipse cx="40" cy="50" rx="3" ry="2" fill="#a855f7" fillOpacity={0.6} />
      <path
        d="M34 54 Q40 58 46 54"
        stroke={accent.mouth}
        strokeOpacity={0.5}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
