import { useCallback, useState } from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { type ScaleType } from 'recharts/types/util/types';

import { compactNumber } from 'shared/lib/formatters';
import {
  CHART_AXIS_STROKE,
  CHART_AXIS_TICK,
  CHART_AXIS_WIDTH,
  CHART_LEGEND_STYLE,
  CHART_TOOLTIP_STYLE,
  type ChartSeries,
  formatTooltipValue,
  seriesLabels,
} from 'shared/ui/Chart/chartTheme';
import { DateTick } from 'shared/ui/DateTick';

interface BarChartProps<T> {
  data: readonly T[];
  series: readonly ChartSeries[];
  yScale?: ScaleType;
  xAxisKey?: string;
  xAxisTick?: 'date' | 'label';
}

export const BarChart = <T,>({
  data,
  series,
  yScale = 'log',
  xAxisKey = 'date',
  xAxisTick = 'date',
}: BarChartProps<T>) => {
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
      <RechartsBarChart data={data as T[]}>
        <XAxis
          dataKey={xAxisKey}
          stroke={CHART_AXIS_STROKE}
          axisLine={false}
          tickLine={false}
          tick={xAxisTick === 'date' ? <DateTick /> : CHART_AXIS_TICK}
          interval="preserveEnd"
        />
        <YAxis
          width={CHART_AXIS_WIDTH}
          stroke={CHART_AXIS_STROKE}
          axisLine={false}
          tickLine={false}
          tick={CHART_AXIS_TICK}
          scale={yScale}
          domain={[1, 'auto']}
          allowDataOverflow
          tickFormatter={compactNumber}
        />
        {series.map(({ field, color }) => (
          <Bar
            key={field}
            dataKey={field}
            fill={color}
            barSize={12}
            minPointSize={3}
            stackId="revenue"
            fillOpacity={dimmed && dimmed !== field ? 0.3 : 1}
          />
        ))}
        <Tooltip
          contentStyle={CHART_TOOLTIP_STYLE}
          cursor={{ fill: 'var(--color-secondary-1)', opacity: 0.3 }}
          formatter={(value, name) => [
            formatTooltipValue(value),
            labels[String(name)] ?? String(name),
          ]}
        />
        <Legend
          wrapperStyle={CHART_LEGEND_STYLE}
          formatter={(value: string) => labels[value] ?? value}
          onMouseEnter={handleLegendEnter}
          onMouseLeave={handleLegendLeave}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
