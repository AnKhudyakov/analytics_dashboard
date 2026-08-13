import { type FC, useId, useMemo, useState } from 'react';

import { compactNumber } from 'shared/lib/formatters';

import {
  Frame,
  Legend,
  LegendLabel,
  LegendRow,
  LegendShare,
  LegendSwatch,
  LegendValue,
  Svg,
} from './PieChart3D.styles';

const WIDTH = 320;
const HEIGHT = 220;
const CX = WIDTH / 2;
const CY = 94;
const RX = 142;
const RY = 68;
const DEPTH = 26;
const POP = 8;
const TAU = Math.PI * 2;
const START = -Math.PI / 2;
const EPSILON = 1e-4;

const normalize = (angle: number) => ((angle % TAU) + TAU) % TAU;

const pointOf = (angle: number, dx: number, dy: number) => ({
  x: CX + dx + RX * Math.cos(angle),
  y: CY + dy + RY * Math.sin(angle),
});

const topFacePath = (from: number, to: number, dx: number, dy: number) => {
  const start = pointOf(from, dx, dy);
  const end = pointOf(to, dx, dy);
  const largeArc = to - from > Math.PI ? 1 : 0;

  return `M ${CX + dx} ${CY + dy} L ${start.x} ${start.y} A ${RX} ${RY} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
};

const wallPath = (from: number, to: number, dx: number, dy: number) => {
  const start = pointOf(from, dx, dy);
  const end = pointOf(to, dx, dy);

  return `M ${start.x} ${start.y} A ${RX} ${RY} 0 0 1 ${end.x} ${end.y} L ${end.x} ${end.y + DEPTH} A ${RX} ${RY} 0 0 0 ${start.x} ${start.y + DEPTH} Z`;
};

const frontRangesOf = (from: number, to: number): [number, number][] => {
  const spans: [number, number][] =
    to - from >= TAU - EPSILON
      ? [[0, Math.PI]]
      : (() => {
          const start = normalize(from);
          const end = normalize(to);

          return start <= end
            ? ([[start, end]] as [number, number][])
            : ([
                [start, TAU],
                [0, end],
              ] as [number, number][]);
        })();

  return spans
    .map(([start, end]): [number, number] => [
      Math.max(start, 0),
      Math.min(end, Math.PI),
    ])
    .filter(([start, end]) => end - start > EPSILON);
};

export interface Pie3DSlice {
  key: string;
  label: string;
  value: number;
  color: string;
}

export interface PieChart3DProps {
  slices: readonly Pie3DSlice[];
  caption: string;
  formatValue?: (value: number) => string;
}

export const PieChart3D: FC<PieChart3DProps> = ({
  slices,
  caption,
  formatValue = compactNumber,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const shadowId = useId().replace(/[^a-zA-Z0-9]/g, '');

  const wedges = useMemo(() => {
    const total = slices.reduce((sum, slice) => sum + slice.value, 0);
    let cursor = START;

    return slices.map((slice) => {
      const share = total > 0 ? slice.value / total : 0;
      const from = cursor;
      const to = cursor + share * TAU;
      cursor = to;

      return { ...slice, share, from, to, mid: (from + to) / 2 };
    });
  }, [slices]);

  const offsetOf = (mid: number, key: string) =>
    active === key
      ? { dx: Math.cos(mid) * POP, dy: Math.sin(mid) * POP * (RY / RX) }
      : { dx: 0, dy: 0 };

  const walls = wedges
    .flatMap((wedge) =>
      frontRangesOf(wedge.from, wedge.to).map((range) => ({ wedge, range }))
    )
    .sort(
      (a, b) =>
        Math.sin((a.range[0] + a.range[1]) / 2) -
        Math.sin((b.range[0] + b.range[1]) / 2)
    );

  return (
    <Frame>
      <Svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={caption}>
        <defs>
          <radialGradient id={shadowId}>
            <stop offset="55%" stopColor="#000" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#000" stopOpacity={0} />
          </radialGradient>
        </defs>

        <ellipse
          cx={CX}
          cy={CY + DEPTH}
          rx={RX * 0.96}
          ry={RY * 0.9}
          fill={`url(#${shadowId})`}
        />

        <g style={{ filter: 'brightness(0.7)' }}>
          {walls.map(({ wedge, range }) => {
            const { dx, dy } = offsetOf(wedge.mid, wedge.key);

            return (
              <path
                key={`${wedge.key}-${range[0]}`}
                d={wallPath(range[0], range[1], dx, dy)}
                fill={wedge.color}
              />
            );
          })}
        </g>

        {wedges.map((wedge) => {
          const { dx, dy } = offsetOf(wedge.mid, wedge.key);

          return (
            <path
              key={wedge.key}
              d={topFacePath(wedge.from, wedge.to, dx, dy)}
              fill={wedge.color}
              stroke="var(--color-primary)"
              strokeOpacity={0.55}
              strokeWidth={1}
              onPointerEnter={() => setActive(wedge.key)}
              onPointerLeave={() => setActive(null)}
            >
              <title>
                {`${wedge.label}: ${formatValue(wedge.value)} (${Math.round(wedge.share * 100)}%)`}
              </title>
            </path>
          );
        })}
      </Svg>

      <Legend aria-label={caption}>
        {wedges.map((wedge) => (
          <LegendRow
            key={wedge.key}
            $active={active === wedge.key}
            onPointerEnter={() => setActive(wedge.key)}
            onPointerLeave={() => setActive(null)}
          >
            <LegendSwatch style={{ backgroundColor: wedge.color }} />
            <LegendLabel>{wedge.label}</LegendLabel>
            <LegendValue>{formatValue(wedge.value)}</LegendValue>
            <LegendShare>{Math.round(wedge.share * 100)}%</LegendShare>
          </LegendRow>
        ))}
      </Legend>
    </Frame>
  );
};
