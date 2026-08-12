import { type CSSProperties } from 'react';

export interface ChartSeries {
  field: string;
  color: string;
  label: string;
}

export const CHART_HEIGHT = 300;

export const CHART_TOOLTIP_STYLE: CSSProperties = {
  backgroundColor: 'var(--color-secondary)',
  borderColor: 'var(--color-secondary-1)',
  borderRadius: '8px',
  color: 'var(--color-base-font)',
};

export const CHART_AXIS_TICK = {
  fill: 'var(--color-chart-axis)',
  fontSize: 12,
} as const;

export const CHART_AXIS_STROKE = 'var(--color-chart-axis)';

export const seriesLabels = (series: readonly ChartSeries[]) =>
  Object.fromEntries(series.map(({ field, label }) => [field, label]));

export const formatTooltipValue = (value: unknown): string => {
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'string') return value;
  return '';
};
