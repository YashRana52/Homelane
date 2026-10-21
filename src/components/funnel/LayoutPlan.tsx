import type { LayoutOption } from '@/data/calculators';

type LayoutPlanProps = {
  shape: LayoutOption['shape'];
  /** Drawn to scale against each other when both are given. */
  primary?: number;
  secondary?: number;
  className?: string;
};

/**
 * A small plan drawing of the chosen layout.
 *
 * Deliberately a diagram, not a floor plan: the job is to confirm "yes, that
 * is the shape I meant" at card size, and a drawing with doors, windows and
 * appliances fails at 180px wide. The room outline is a thin rule and the
 * counter runs are the solid coral bars, because the runs are what is being
 * priced.
 *
 * `currentColor` is not used — the bars must stay coral even inside a selected
 * card whose text colour has changed.
 */
export function LayoutPlan({ shape, primary, secondary, className }: LayoutPlanProps) {
  const runs = RUNS[shape];

  return (
    <svg
      viewBox="0 0 120 80"
      className={className ?? 'h-20 w-full'}
      role="img"
      aria-label={`${LABELS[shape]} layout plan`}
    >
      {/* Room outline */}
      <rect
        x="6"
        y="6"
        width="108"
        height="68"
        rx="3"
        fill="var(--c-surface-50)"
        stroke="var(--c-surface-300)"
        strokeWidth="1.5"
      />

      {/* Counter runs */}
      {runs.map((run, i) => (
        <rect
          key={i}
          x={run.x}
          y={run.y}
          width={run.w}
          height={run.h}
          rx="1.5"
          fill="var(--c-primary-500)"
        />
      ))}

      {/* Dimension labels, when the caller knows them */}
      {primary !== undefined && (
        <text
          x="60"
          y="78"
          textAnchor="middle"
          fontSize="8"
          fill="var(--c-surface-600)"
          fontFamily="var(--font-sans)"
        >
          {primary.toLocaleString('en-IN')}
          {secondary !== undefined ? ` × ${secondary}` : ''}
        </text>
      )}
    </svg>
  );
}

const T = 9; // counter depth in viewBox units

const RUNS: Record<LayoutOption['shape'], { x: number; y: number; w: number; h: number }[]> = {
  straight: [{ x: 14, y: 14, w: 92, h: T }],
  l: [
    { x: 14, y: 14, w: 92, h: T },
    { x: 14, y: 14, w: T, h: 52 },
  ],
  u: [
    { x: 14, y: 14, w: 92, h: T },
    { x: 14, y: 14, w: T, h: 52 },
    { x: 97, y: 14, w: T, h: 52 },
  ],
  parallel: [
    { x: 14, y: 14, w: 92, h: T },
    { x: 14, y: 57, w: 92, h: T },
  ],
  island: [
    { x: 14, y: 14, w: 92, h: T },
    { x: 36, y: 44, w: 48, h: T + 3 },
  ],
  // Full home: a simple floor plate with a partition, since there is no
  // counter run to draw.
  box: [
    { x: 14, y: 14, w: T, h: 52 },
    { x: 60, y: 14, w: 2.5, h: 52 },
  ],
};

const LABELS: Record<LayoutOption['shape'], string> = {
  straight: 'Straight',
  l: 'L-shaped',
  u: 'U-shaped',
  parallel: 'Parallel',
  island: 'Island',
  box: 'Floor plate',
};
