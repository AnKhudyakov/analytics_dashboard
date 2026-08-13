import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { DONUT_COLORS } from 'shared/ui/Chart/chartTheme';

import {
  ChartBox,
  Legend,
  LegendDot,
  LegendLabel,
  LegendRow,
  LegendValue,
  Wrapper,
} from './DonutChart.styles';

export interface DonutSlice {
  key: string;
  label: string;
  value: number;
  formattedValue: string;
}

interface DonutChartProps {
  slices: readonly DonutSlice[];
  caption: string;
  height?: number;
}

export const DonutChart = ({
  slices,
  caption,
  height = 180,
}: DonutChartProps) => (
  <Wrapper>
    <ChartBox style={{ height }} aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={slices as DonutSlice[]}
            dataKey="value"
            nameKey="label"
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            stroke="var(--glass-bg-strong)"
            strokeWidth={2}
            isAnimationActive={false}
          >
            {slices.map((slice, index) => (
              <Cell
                key={slice.key}
                fill={DONUT_COLORS[index % DONUT_COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>

    <Legend aria-label={caption}>
      {slices.map((slice, index) => (
        <LegendRow key={slice.key}>
          <LegendDot
            style={{
              backgroundColor: DONUT_COLORS[index % DONUT_COLORS.length],
            }}
          />
          <LegendLabel>{slice.label}</LegendLabel>
          <LegendValue>{slice.formattedValue}</LegendValue>
        </LegendRow>
      ))}
    </Legend>
  </Wrapper>
);
