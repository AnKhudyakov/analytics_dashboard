import { formatDate } from 'shared/lib/helpers';

export const CustomDateTick = ({ x, y, payload }: any) => {
  const date = formatDate(payload.value);
  const dayMonth = date.second;
  const year = date.first;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#AAB7CF"
        fontSize={12}
      >
        <tspan x={0} dy={10}>
          {dayMonth}
        </tspan>
        <tspan x={0} dy={12}>
          {year}
        </tspan>
      </text>
    </g>
  );
};
