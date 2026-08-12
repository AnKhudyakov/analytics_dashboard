import { splitDateLabel } from 'shared/lib/formatters';

export interface DateTickProps {
  x?: number;
  y?: number;
  payload?: { value?: string | number };
}

export const DateTick = ({ x = 0, y = 0, payload }: DateTickProps) => {
  const { year, dayMonth } = splitDateLabel(String(payload?.value ?? ''));

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="var(--color-chart-axis)"
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
