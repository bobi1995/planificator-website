'use client';

import {useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {cn} from '@/lib/utils';

interface AnimatedGanttProps {
  className?: string;
}

// --- Layout constants (same as GanttMockup.tsx) ---
const LABEL_WIDTH = 90;
const CHART_LEFT = LABEL_WIDTH;
const CHART_WIDTH = 800 - LABEL_WIDTH; // 710
const DAY_WIDTH = CHART_WIDTH / 5; // 142
const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 60;
const BAR_PADDING = 14;
const BAR_HEIGHT = ROW_HEIGHT - 28; // 32
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const RESOURCES = [
  'Machine A',
  'Machine B',
  'Machine C',
  'Line 1',
  'Line 2',
  'Line 3',
];

// --- Helpers ---
function barX(startDay: number) {
  return CHART_LEFT + startDay * DAY_WIDTH;
}
function barW(startDay: number, endDay: number) {
  return (endDay - startDay) * DAY_WIDTH;
}
function barY(row: number) {
  return HEADER_HEIGHT + row * ROW_HEIGHT + BAR_PADDING;
}

// --- Bar data type: [rowIndex, startDay, endDay, fillColor] ---
type BarDef = [number, number, number, string];

// Chaos bars: overlapping, gaps, red/amber/orange colors
const CHAOS_BARS: BarDef[] = [
  [0, 0.0, 2.0, '#ef4444'], // red-500, overlaps next
  [0, 1.2, 2.8, '#f97316'], // orange-500, overlapping!
  [1, 0.5, 3.8, '#f59e0b'], // amber-500, hogs resource
  [2, 2.0, 4.2, '#ef4444'], // gap before this bar
  [2, 0.2, 1.0, '#fb923c'], // small, big gap after
  [3, 0.0, 1.5, '#f97316'],
  [3, 3.0, 5.0, '#f59e0b'], // gap in middle
  [4, 0.0, 0.8, '#ef4444'], // tiny task
  [4, 2.5, 4.8, '#fb923c'], // big gap before
  [5, 0.5, 2.0, '#f59e0b'],
  [5, 2.2, 3.0, '#ef4444'], // small leftover
];

// Optimized bars: matching the static GanttMockup layout with brand-blue colors.
// Using hex colors because Motion cannot interpolate oklch/CSS variables.
const OPTIMIZED_BARS: BarDef[] = [
  [0, 0.0, 1.4, '#2563eb'], // brand-600
  [0, 1.7, 3.0, '#60a5fa'], // brand-400
  [1, 0.3, 3.3, '#3b82f6'], // brand-500
  [2, 0.8, 2.2, '#1d4ed8'], // brand-700
  [2, 2.6, 4.0, '#60a5fa'], // brand-400
  [3, 0.0, 2.0, '#2563eb'], // brand-600
  [3, 2.5, 4.5, '#3b82f6'], // brand-500
  [4, 0.5, 1.5, '#3b82f6'], // brand-500
  [4, 1.9, 4.5, '#1d4ed8'], // brand-700
  [5, 1.2, 3.7, '#60a5fa'], // brand-400
  [5, 3.9, 5.0, '#2563eb'], // brand-600
];

/**
 * Animated Gantt chart that plays a chaos-to-order transition.
 *
 * Renders 11 bars initially in chaotic red/amber positions (overlapping, gaps),
 * holds for 1 second, then smoothly transitions each bar to its optimized
 * brand-blue position over ~3 seconds total (staggered 80ms per bar).
 *
 * Respects prefers-reduced-motion by showing the optimized state directly.
 */
export function AnimatedGantt({className}: AnimatedGanttProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Trigger the animation 1 second after mount
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <svg
      viewBox="0 0 800 400"
      className={cn('w-full h-auto', className)}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect
        x="0"
        y="0"
        width="800"
        height="400"
        style={{fill: 'var(--color-brand-50)'}}
      />

      {/* Header background */}
      <rect
        x="0"
        y="0"
        width="800"
        height={HEADER_HEIGHT}
        style={{fill: 'var(--color-brand-100)'}}
      />

      {/* Alternating row stripes */}
      {RESOURCES.map((_, i) =>
        i % 2 === 1 ? (
          <rect
            key={`stripe-${i}`}
            x="0"
            y={HEADER_HEIGHT + i * ROW_HEIGHT}
            width="800"
            height={ROW_HEIGHT}
            style={{fill: 'var(--color-brand-100)'}}
            opacity="0.4"
          />
        ) : null,
      )}

      {/* Vertical day divider lines */}
      {DAYS.map((_, i) => (
        <line
          key={`vline-${i}`}
          x1={CHART_LEFT + i * DAY_WIDTH}
          y1="0"
          x2={CHART_LEFT + i * DAY_WIDTH}
          y2="400"
          style={{stroke: 'var(--color-brand-100)'}}
          strokeWidth="1"
        />
      ))}
      {/* Right edge line */}
      <line
        x1="799"
        y1="0"
        x2="799"
        y2="400"
        style={{stroke: 'var(--color-brand-100)'}}
        strokeWidth="1"
      />

      {/* Horizontal row divider lines */}
      {RESOURCES.map((_, i) => (
        <line
          key={`hline-${i}`}
          x1="0"
          y1={HEADER_HEIGHT + i * ROW_HEIGHT}
          x2="800"
          y2={HEADER_HEIGHT + i * ROW_HEIGHT}
          style={{stroke: 'var(--color-brand-100)'}}
          strokeWidth="1"
        />
      ))}

      {/* Label column separator */}
      <line
        x1={LABEL_WIDTH}
        y1="0"
        x2={LABEL_WIDTH}
        y2="400"
        style={{stroke: 'var(--color-brand-200)'}}
        strokeWidth="1"
      />

      {/* Header day labels */}
      {DAYS.map((day, i) => (
        <text
          key={`day-${i}`}
          x={CHART_LEFT + i * DAY_WIDTH + DAY_WIDTH / 2}
          y="26"
          textAnchor="middle"
          style={{
            fill: 'var(--color-foreground)',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          {day}
        </text>
      ))}

      {/* Resource row labels */}
      {RESOURCES.map((name, i) => (
        <text
          key={`label-${i}`}
          x="10"
          y={HEADER_HEIGHT + i * ROW_HEIGHT + ROW_HEIGHT / 2 + 4}
          style={{
            fill: 'var(--color-muted-foreground)',
            fontSize: '11px',
            fontWeight: 500,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          {name}
        </text>
      ))}

      {/* Animated task bars */}
      {shouldReduceMotion
        ? /* Reduced motion: render optimized bars as static rects */
          OPTIMIZED_BARS.map(([row, startDay, endDay, color], i) => (
            <rect
              key={`bar-${i}`}
              x={barX(startDay)}
              y={barY(row)}
              width={barW(startDay, endDay)}
              height={BAR_HEIGHT}
              rx="6"
              ry="6"
              fill={color}
              opacity={0.9}
            />
          ))
        : /* Normal: animate from chaos to optimized */
          CHAOS_BARS.map((chaosBar, i) => {
            const optBar = OPTIMIZED_BARS[i];
            return (
              <motion.rect
                key={`bar-${i}`}
                rx="6"
                ry="6"
                height={BAR_HEIGHT}
                initial={{
                  attrX: barX(chaosBar[1]),
                  attrY: barY(chaosBar[0]),
                  width: barW(chaosBar[1], chaosBar[2]),
                  fill: chaosBar[3],
                  opacity: 0.7,
                }}
                animate={
                  hasAnimated
                    ? {
                        attrX: barX(optBar[1]),
                        attrY: barY(optBar[0]),
                        width: barW(optBar[1], optBar[2]),
                        fill: optBar[3],
                        opacity: 0.9,
                      }
                    : {
                        attrX: barX(chaosBar[1]),
                        attrY: barY(chaosBar[0]),
                        width: barW(chaosBar[1], chaosBar[2]),
                        fill: chaosBar[3],
                        opacity: 0.7,
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: hasAnimated ? i * 0.08 : 0,
                }}
              />
            );
          })}

      {/* Subtle "now" indicator line (vertical dashed line at ~Wednesday noon) */}
      <line
        x1={CHART_LEFT + 2.5 * DAY_WIDTH}
        y1={HEADER_HEIGHT}
        x2={CHART_LEFT + 2.5 * DAY_WIDTH}
        y2="400"
        style={{stroke: 'var(--color-brand-600)'}}
        strokeWidth="1.5"
        strokeDasharray="6 4"
        opacity="0.5"
      />
    </svg>
  );
}
