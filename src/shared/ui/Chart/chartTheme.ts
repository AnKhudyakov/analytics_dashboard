import { type CSSProperties } from 'react';

export interface ChartSeries {
  field: string;
  color: string;
  label: string;
}

export const CHART_TOOLTIP_STYLE: CSSProperties = {
  backgroundColor: 'var(--glass-bg-strong)',
  backdropFilter: 'blur(var(--glass-blur))',
  borderColor: 'var(--glass-border)',
  borderRadius: '12px',
  color: 'var(--color-base-font)',
};

export const CHART_AXIS_TICK = {
  fill: 'var(--color-chart-axis)',
  fontSize: 12,
} as const;

export const CHART_AXIS_STROKE = 'var(--color-chart-axis)';

export const DONUT_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
] as const;

export const OWN_SERIES_COLOR = 'var(--color-chart-2)';

export const COMPETITOR_COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-chart-6)',
] as const;

export const STEP_COLORS = [
  'var(--color-step-1)',
  'var(--color-step-2)',
  'var(--color-step-3)',
  'var(--color-step-4)',
] as const;

export const PIE_COLORS = [
  'var(--color-pie-1)',
  'var(--color-pie-2)',
  'var(--color-pie-3)',
  'var(--color-pie-4)',
] as const;

export const PIE_OTHER_COLOR = 'var(--color-pie-other)';

export const seriesLabels = (series: readonly ChartSeries[]) =>
  Object.fromEntries(series.map(({ field, label }) => [field, label]));

export const formatTooltipValue = (value: unknown): string => {
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'string') return value;
  return '';
};
