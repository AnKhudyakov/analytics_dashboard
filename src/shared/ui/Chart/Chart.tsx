import { useCallback, useState } from 'react';
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { type ScaleType } from 'recharts/types/util/types';

import { compactNumber } from 'shared/lib/formatters';
import { DateTick } from 'shared/ui/DateTick';

import {
  CHART_AXIS_STROKE,
  CHART_AXIS_TICK,
  CHART_HEIGHT,
  CHART_TOOLTIP_STYLE,
  type ChartSeries,
  formatTooltipValue,
  seriesLabels,
} from './chartTheme';

export type { ChartSeries };

interface ChartProps<T> {
  data: readonly T[];
  series: readonly ChartSeries[];
  biaxial?: boolean;
  yScale?: ScaleType;
}

export const Chart = <T,>({
  data,
  series,
  biaxial,
  yScale = 'auto',
}: ChartProps<T>) => {
  const [dimmed, setDimmed] = useState<string | null>(null);
  const labels = seriesLabels(series);

  const handleLegendEnter = useCallback(
    (entry: { dataKey?: unknown }) =>
      setDimmed(typeof entry.dataKey === 'string' ? entry.dataKey : null),
    []
  );
  const handleLegendLeave = useCallback(() => setDimmed(null), []);

  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <AreaChart data={data as T[]}>
        <defs>
          {series.map(({ field, color }) => (
            <linearGradient
              key={field}
              id={`chart-gradient-${field}`}
              x1="0"
              y1="1"
              x2="0"
              y2="0"
            >
              <stop offset="20%" stopColor={color} stopOpacity={0.05} />
              <stop offset="80%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>

        {series.map(({ field, color }, index) => (
          <Area
            key={field}
            yAxisId={index > 0 && biaxial ? 'right' : 'left'}
            type="linear"
            dataKey={field}
            stroke={color}
            strokeWidth={1}
            fillOpacity={0.2}
            fill={`url(#chart-gradient-${field})`}
            strokeOpacity={dimmed && dimmed !== field ? 0.3 : 1}
          />
        ))}

        <XAxis
          dataKey="date"
          stroke={CHART_AXIS_STROKE}
          axisLine={false}
          tickLine={false}
          tick={<DateTick />}
          interval="preserveEnd"
        />
        <YAxis
          yAxisId="left"
          stroke={CHART_AXIS_STROKE}
          scale={yScale}
          allowDataOverflow
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          tick={CHART_AXIS_TICK}
          tickFormatter={compactNumber}
        />
        {biaxial && (
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={CHART_AXIS_STROKE}
            axisLine={false}
            tickLine={false}
            tick={CHART_AXIS_TICK}
            tickFormatter={compactNumber}
          />
        )}
        {series.length > 1 && (
          <Legend
            formatter={(value: string) => labels[value] ?? value}
            onMouseEnter={handleLegendEnter}
            onMouseLeave={handleLegendLeave}
          />
        )}
        <Tooltip
          cursor={false}
          contentStyle={CHART_TOOLTIP_STYLE}
          formatter={(value, name) => [
            formatTooltipValue(value),
            labels[String(name)] ?? String(name),
          ]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
