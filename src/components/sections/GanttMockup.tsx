import {cn} from '@/lib/utils';

interface GanttMockupProps {
  className?: string;
}

/**
 * Static SVG Gantt chart mockup for the Hero section.
 *
 * Renders a simplified but realistic-looking production schedule
 * using brand color CSS variables. Decorative only (aria-hidden).
 *
 * Will be replaced with an animated Framer Motion version in Phase 4.
 */
export function GanttMockup({className}: GanttMockupProps) {
  // Day column positions (5 days across 800px, with left margin for labels)
  const labelWidth = 90;
  const chartLeft = labelWidth;
  const chartWidth = 800 - labelWidth; // 710
  const dayWidth = chartWidth / 5; // 142

  // Row layout
  const headerHeight = 40;
  const rowHeight = 60;
  const rowCount = 6;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const resources = ['Machine A', 'Machine B', 'Machine C', 'Line 1', 'Line 2', 'Line 3'];

  // Task bars: [rowIndex, startDay (0-5), endDay (0-5), colorVar]
  const bars: [number, number, number, string][] = [
    [0, 0.0, 1.4, 'var(--color-brand-600)'],
    [0, 1.7, 3.0, 'var(--color-brand-400)'],
    [1, 0.3, 3.3, 'var(--color-brand-500)'],
    [2, 0.8, 2.2, 'var(--color-brand-700)'],
    [2, 2.6, 4.0, 'var(--color-brand-400)'],
    [3, 0.0, 2.0, 'var(--color-brand-600)'],
    [3, 2.5, 4.5, 'var(--color-brand-500)'],
    [4, 0.5, 1.5, 'var(--color-brand-500)'],
    [4, 1.9, 4.5, 'var(--color-brand-700)'],
    [5, 1.2, 3.7, 'var(--color-brand-400)'],
    [5, 3.9, 5.0, 'var(--color-brand-600)'],
  ];

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
        height={headerHeight}
        style={{fill: 'var(--color-brand-100)'}}
      />

      {/* Alternating row stripes */}
      {resources.map((_, i) =>
        i % 2 === 1 ? (
          <rect
            key={`stripe-${i}`}
            x="0"
            y={headerHeight + i * rowHeight}
            width="800"
            height={rowHeight}
            style={{fill: 'var(--color-brand-100)'}}
            opacity="0.4"
          />
        ) : null,
      )}

      {/* Vertical day divider lines */}
      {days.map((_, i) => (
        <line
          key={`vline-${i}`}
          x1={chartLeft + i * dayWidth}
          y1="0"
          x2={chartLeft + i * dayWidth}
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
      {resources.map((_, i) => (
        <line
          key={`hline-${i}`}
          x1="0"
          y1={headerHeight + i * rowHeight}
          x2="800"
          y2={headerHeight + i * rowHeight}
          style={{stroke: 'var(--color-brand-100)'}}
          strokeWidth="1"
        />
      ))}

      {/* Label column separator */}
      <line
        x1={labelWidth}
        y1="0"
        x2={labelWidth}
        y2="400"
        style={{stroke: 'var(--color-brand-200)'}}
        strokeWidth="1"
      />

      {/* Header day labels */}
      {days.map((day, i) => (
        <text
          key={`day-${i}`}
          x={chartLeft + i * dayWidth + dayWidth / 2}
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
      {resources.map((name, i) => (
        <text
          key={`label-${i}`}
          x="10"
          y={headerHeight + i * rowHeight + rowHeight / 2 + 4}
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

      {/* Task bars */}
      {bars.map(([row, startDay, endDay, color], i) => {
        const x = chartLeft + startDay * dayWidth;
        const width = (endDay - startDay) * dayWidth;
        const y = headerHeight + row * rowHeight + 14;
        const height = rowHeight - 28;

        return (
          <rect
            key={`bar-${i}`}
            x={x}
            y={y}
            width={width}
            height={height}
            rx="6"
            ry="6"
            style={{fill: color}}
            opacity="0.9"
          />
        );
      })}

      {/* Subtle "now" indicator line (vertical dashed line at ~Wednesday noon) */}
      <line
        x1={chartLeft + 2.5 * dayWidth}
        y1={headerHeight}
        x2={chartLeft + 2.5 * dayWidth}
        y2="400"
        style={{stroke: 'var(--color-brand-600)'}}
        strokeWidth="1.5"
        strokeDasharray="6 4"
        opacity="0.5"
      />
    </svg>
  );
}
