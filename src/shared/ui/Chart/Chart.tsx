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
  CHART_AXIS_WIDTH,
  CHART_LEGEND_STYLE,
  CHART_TOOLTIP_STYLE,
  type ChartSeries,
  formatTooltipValue,
  seriesLabels,
} from './chartTheme';

export type { ChartSeries };

interface ChartProps<T> {
  data: readonly T[];
  series: readonly ChartSeries[];
  yScale?: ScaleType;
  hideValueAxis?: boolean;
}

export const Chart = <T,>({
  data,
  series,
  yScale = 'auto',
  hideValueAxis,
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
    <ResponsiveContainer width="100%" height="100%">
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

        {series.map(({ field, color }) => (
          <Area
            key={field}
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
          hide={hideValueAxis}
          width={CHART_AXIS_WIDTH}
          stroke={CHART_AXIS_STROKE}
          scale={yScale}
          allowDataOverflow
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          tick={CHART_AXIS_TICK}
          tickFormatter={compactNumber}
        />
        {series.length > 1 && (
          <Legend
            wrapperStyle={CHART_LEGEND_STYLE}
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
