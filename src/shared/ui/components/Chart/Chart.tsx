import { FC, useState } from 'react';
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { convertBigNumbers, transformField } from 'shared/lib/helpers';
import { CustomDateTick } from 'shared/ui/components/CustomDateTick';
import { ChartProps } from './Chart.def';

export const Chart: FC<ChartProps> = ({
  data,
  dataKeys,
  legendLabels,
  biaxial,
  Yscale = 'auto',
}) => {
  const [opacity, setOpacity] = useState(transformField(dataKeys));

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;
    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;
    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          {dataKeys.map((dataKey, index) => (
            <linearGradient
              key={index}
              id={`color_${index}`}
              x1="0"
              y1="1"
              x2="0"
              y2="0"
            >
              <stop offset="20%" stopColor="#3C87E9" />
              <stop offset="80%" stopColor={dataKey.color} />
            </linearGradient>
          ))}
        </defs>

        {dataKeys.map((dataKey, index) => (
          <Area
            key={dataKey.field}
            yAxisId={index && biaxial ? 'right' : 'left'}
            type={'linear'}
            dataKey={dataKey.field}
            stroke={dataKey.color}
            strokeWidth={1}
            fillOpacity={0.2}
            fill={`url(#color_${index})`}
            strokeOpacity={opacity[dataKey.field]}
          />
        ))}
        <XAxis
          dataKey="date"
          stroke="#AAA"
          axisLine={false}
          tickLine={false}
          tick={<CustomDateTick />}
          interval="preserveEnd"
        />
        <YAxis
          stroke="#AAA"
          yAxisId="left"
          scale={Yscale}
          allowDataOverflow
          domain={['auto', 'auto']}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#AAB7CF', fontSize: 12 }}
          tickFormatter={(value) => convertBigNumbers(value)}
        />
        <YAxis
          stroke="#AAA"
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#AAB7CF', fontSize: 12 }}
          tickFormatter={(value) => convertBigNumbers(value)}
        />
        {Object.keys(legendLabels).length > 1 && (
          <Legend
            formatter={(value) => legendLabels[value]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: '#0b1739',
            borderRadius: '8px',
            borderColor: '#343b4f',
          }}
          formatter={(value, name) => [
            value.toLocaleString(),
            legendLabels[name],
          ]}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
