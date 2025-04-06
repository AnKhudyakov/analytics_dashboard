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
import { formatAxis, transformField } from 'shared/lib/helpers/helpers';
import { CustomDateTick } from 'shared/ui/components/CustomDateTick';
import { CustomBarChartProps } from './CustomBarChart.def';

export const CustomBarChart: FC<CustomBarChartProps> = ({
  data,
  dataKeys,
  legendLabels,
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
        <defs>
          <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor="#36C1F5" />
            <stop offset="100%" stopColor="#3C87E9" />
          </linearGradient>
        </defs>
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
          scale="log"
          domain={[1, 'auto']}
          allowDataOverflow
          tickFormatter={(value) => formatAxis(value)}
        />
        {dataKeys.map((dataKey, index) => (
          <Bar
            key={dataKey.field}
            type="monotone"
            dataKey={dataKey.field}
            fill={index ? dataKey.color : 'url(#colorBar)'}
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
