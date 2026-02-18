import { cn } from "@/lib/utils";

type LogoVariant = "default" | "white" | "icon";
type LogoSize = "xs" | "sm" | "md" | "lg";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}

const sizeMap: Record<LogoSize, { icon: number; width: number; height: number }> = {
  xs: { icon: 24, width: 120, height: 24 },
  sm: { icon: 28, width: 140, height: 28 },
  md: { icon: 36, width: 180, height: 36 },
  lg: { icon: 48, width: 240, height: 48 },
};

/**
 * Gantt bars icon SVG paths.
 *
 * 4 horizontal rounded rectangles of varying lengths and x-offsets
 * within a 48x48 viewBox. Bars are 4px tall with 4px gaps, vertically
 * centered (starting at y=10).
 *
 * Bar layout:
 *   Bar 1: x=2,  width=22  (short, starts left)
 *   Bar 2: x=8,  width=36  (long, offset right)
 *   Bar 3: x=4,  width=28  (medium, slight offset)
 *   Bar 4: x=12, width=32  (medium-long, more offset)
 */
function GanttBarsIcon({ fill }: { fill: string }) {
  return (
    <>
      <rect x="2" y="10" width="22" height="4" rx="2" fill={fill} />
      <rect x="8" y="18" width="36" height="4" rx="2" fill={fill} />
      <rect x="4" y="26" width="28" height="4" rx="2" fill={fill} />
      <rect x="12" y="34" width="32" height="4" rx="2" fill={fill} />
    </>
  );
}

export function Logo({ variant = "default", size = "md", className }: LogoProps) {
  const dimensions = sizeMap[size];
  const fill = variant === "white" ? "#ffffff" : "currentColor";

  // Icon-only variant: square viewBox with just the Gantt bars
  if (variant === "icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={dimensions.icon}
        height={dimensions.icon}
        role="img"
        aria-label="Planificator"
        className={cn("shrink-0", className)}
      >
        <GanttBarsIcon fill="currentColor" />
      </svg>
    );
  }

  // Full logo: icon + "Planificator" text in wider viewBox
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 48"
      width={dimensions.width}
      height={dimensions.height}
      role="img"
      aria-label="Planificator"
      className={cn("shrink-0", className)}
    >
      {/* Gantt bars icon */}
      <GanttBarsIcon fill={fill} />

      {/* "Planificator" text */}
      <text
        x="56"
        y="32"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontWeight={600}
        fontSize="20"
        fill={fill}
        letterSpacing="-0.01em"
      >
        Planificator
      </text>
    </svg>
  );
}
