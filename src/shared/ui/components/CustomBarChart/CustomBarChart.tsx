import { FC, useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { convertBigNumbers, transformField } from 'shared/lib/helpers';
import { CustomDateTick } from 'shared/ui/components/CustomDateTick';
import { CustomBarChartProps } from './CustomBarChart.def';

export const CustomBarChart: FC<CustomBarChartProps> = ({
  data,
  dataKeys,
  legendLabels,
  Yscale = 'log'
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
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#AAA"
          axisLine={false}
          tickLine={false}
          tick={<CustomDateTick />}
        />
        <YAxis
          stroke="#AAA"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#AAB7CF', fontSize: 12 }}
          scale={Yscale}
          domain={[1, 'auto']}
          allowDataOverflow
          tickFormatter={(value) => convertBigNumbers(value)}
        />
        {dataKeys.map((dataKey, index) => (
          <Bar
            key={dataKey.field}
            type="monotone"
            dataKey={dataKey.field}
            fill={dataKey.color}
            barSize={12}
            minPointSize={3}
            stackId="a"
            fillOpacity={opacity[dataKey.field]}
          />
        ))}
        <Tooltip
          formatter={(value, name) => [
            value.toLocaleString(),
            legendLabels[name],
          ]}
          contentStyle={{
            backgroundColor: '#0b1739',
            borderRadius: '8px',
            borderColor: '#343b4f',
          }}
          cursor={{ fill: 'white', opacity: 0.2 }}
        />
        <Legend
          formatter={(value) => legendLabels[value]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
