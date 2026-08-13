import { geoArea, geoCentroid, geoNaturalEarth1, geoPath } from 'd3-geo';
import { type Feature, type FeatureCollection, type Geometry } from 'geojson';
import { type FC, useId, useMemo, useRef, useState } from 'react';
import { feature } from 'topojson-client';
import { type GeometryCollection } from 'topojson-specification';
import worldTopology from 'world-atlas/countries-110m.json';

import { compactNumber } from 'shared/lib/formatters';
import { countryLabel, isoNumericOf } from 'shared/lib/geo';

import {
  Dot,
  Frame,
  Legend,
  LegendItem,
  LegendSwatch,
  Notice,
  Svg,
  TooltipCard,
  TooltipLink,
  TooltipTitle,
  TooltipValue,
} from './WorldMap.styles';

const WIDTH = 880;
const HEIGHT = 380;
const PADDING = 8;
const MIN_RADIUS = 4.5;
const MAX_RADIUS = 11;
const HALO_SCALE = 3;
const CLOSE_DELAY = 140;

const ANTARCTICA = '010';

const countries = feature(
  worldTopology,
  worldTopology.objects.countries as GeometryCollection
) as FeatureCollection<Geometry>;

const world: FeatureCollection<Geometry> = {
  type: 'FeatureCollection',
  features: countries.features.filter((item) => String(item.id) !== ANTARCTICA),
};

const projection = geoNaturalEarth1().fitExtent(
  [
    [PADDING, PADDING],
    [WIDTH - PADDING, HEIGHT - PADDING],
  ],
  world
);

const toPath = geoPath(projection);

const mainlandCentroid = (item: Feature<Geometry>): [number, number] => {
  if (item.geometry.type !== 'MultiPolygon') return geoCentroid(item);

  let largest: Feature<Geometry> | null = null;
  let largestArea = -1;

  item.geometry.coordinates.forEach((coordinates) => {
    const part: Feature<Geometry> = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Polygon', coordinates },
    };
    const area = geoArea(part);

    if (area > largestArea) {
      largestArea = area;
      largest = part;
    }
  });

  return geoCentroid(largest ?? item);
};

const LAND = world.features.map((item, index) => ({
  key: String(index),
  id: item.id === undefined ? '' : String(item.id),
  d: toPath(item) ?? '',
}));

const POSITIONS = new Map<string, { x: number; y: number }>();

world.features.forEach((item) => {
  if (item.id === undefined) return;

  const [x, y] = projection(mainlandCentroid(item)) ?? [];
  if (x !== undefined && y !== undefined) {
    POSITIONS.set(String(item.id), { x, y });
  }
});

export interface WorldMapMarker {
  id: string;
  label: string;
  country: string | null;
  value: number;
  href: string;
  isOwn?: boolean;
}

interface MapGroup {
  code: string;
  name: string;
  x: number;
  y: number;
  total: number;
  hasOwn: boolean;
  items: WorldMapMarker[];
}

export interface WorldMapProps {
  markers: readonly WorldMapMarker[];
  caption: string;
  valueLabel: string;
  ownLabel: string;
  competitorLabel: string;
  unplacedLabel: string;
  openLabel: string;
  locale: string;
}

export const WorldMap: FC<WorldMapProps> = ({
  markers,
  caption,
  valueLabel,
  ownLabel,
  competitorLabel,
  unplacedLabel,
  openLabel,
  locale,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gradientId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const haloOf = (hasOwn: boolean) =>
    `${gradientId}-${hasOwn ? 'own' : 'rival'}`;

  const { groups, unplaced } = useMemo(() => {
    const byCountry = new Map<string, MapGroup>();
    const skipped: WorldMapMarker[] = [];

    markers.forEach((marker) => {
      const numeric = marker.country ? isoNumericOf(marker.country) : undefined;
      const position = numeric ? POSITIONS.get(numeric) : undefined;

      if (!numeric || !position || !marker.country) {
        skipped.push(marker);
        return;
      }

      const group = byCountry.get(numeric) ?? {
        code: numeric,
        name: countryLabel(marker.country, locale),
        x: position.x,
        y: position.y,
        total: 0,
        hasOwn: false,
        items: [],
      };

      group.total += marker.value;
      group.hasOwn = group.hasOwn || Boolean(marker.isOwn);
      group.items.push(marker);
      byCountry.set(numeric, group);
    });

    return {
      groups: [...byCountry.values()].sort((a, b) => b.total - a.total),
      unplaced: skipped,
    };
  }, [markers, locale]);

  const maxTotal = Math.max(...groups.map((group) => group.total), 1);
  const activeCodes = new Set(groups.map((group) => group.code));
  const activeGroup = groups.find((group) => group.code === active) ?? null;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const open = (code: string) => {
    cancelClose();
    setActive(code);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY);
  };

  const radiusOf = (total: number) =>
    MIN_RADIUS + Math.sqrt(total / maxTotal) * (MAX_RADIUS - MIN_RADIUS);

  const describe = (group: MapGroup) =>
    `${group.name}: ${group.items
      .map(
        (item) => `${item.label} — ${compactNumber(item.value)} ${valueLabel}`
      )
      .join(', ')}`;

  return (
    <Frame onKeyDown={(event) => event.key === 'Escape' && setActive(null)}>
      <Svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={caption}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {[true, false].map((hasOwn) => (
            <radialGradient key={haloOf(hasOwn)} id={haloOf(hasOwn)}>
              <stop
                offset="35%"
                style={{
                  stopColor: hasOwn
                    ? 'var(--color-chart-2)'
                    : 'var(--color-chart-1)',
                  stopOpacity: 0.45,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: hasOwn
                    ? 'var(--color-chart-2)'
                    : 'var(--color-chart-1)',
                  stopOpacity: 0,
                }}
              />
            </radialGradient>
          ))}
        </defs>

        <g>
          {LAND.map((country) => (
            <path
              key={country.key}
              d={country.d}
              fill={
                activeCodes.has(country.id)
                  ? 'var(--color-map-active)'
                  : 'var(--color-map-land)'
              }
              stroke="var(--color-map-stroke)"
              strokeWidth={0.5}
            />
          ))}
        </g>

        {groups.map((group) => {
          const radius = radiusOf(group.total);
          const color = group.hasOwn
            ? 'var(--color-chart-2)'
            : 'var(--color-chart-1)';

          return (
            <Dot
              key={group.code}
              tabIndex={0}
              role="button"
              aria-label={describe(group)}
              onPointerEnter={() => open(group.code)}
              onPointerLeave={scheduleClose}
              onFocus={() => open(group.code)}
              onBlur={scheduleClose}
            >
              <circle
                className="transition-opacity duration-200"
                cx={group.x}
                cy={group.y}
                r={radius * HALO_SCALE}
                fill={`url(#${haloOf(group.hasOwn)})`}
                style={{ opacity: active === group.code ? 1 : 0.7 }}
              />
              <circle
                cx={group.x}
                cy={group.y}
                r={radius}
                fill={color}
                stroke="var(--color-primary)"
                strokeOpacity={0.85}
                strokeWidth={1.25}
              />
            </Dot>
          );
        })}
      </Svg>

      {activeGroup && (
        <TooltipCard
          style={{
            left: `${Math.min(Math.max((activeGroup.x / WIDTH) * 100, 14), 86)}%`,
            top: `${(activeGroup.y / HEIGHT) * 100}%`,
          }}
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleClose}
        >
          <TooltipTitle>{activeGroup.name}</TooltipTitle>
          {activeGroup.items.map((item) => (
            <TooltipLink key={item.id} to={item.href} title={openLabel}>
              <span className="truncate">
                {item.label}
                {item.isOwn ? ` · ${ownLabel}` : ''}
              </span>
              <TooltipValue>{compactNumber(item.value)}</TooltipValue>
            </TooltipLink>
          ))}
        </TooltipCard>
      )}

      <Legend>
        <LegendItem>
          <LegendSwatch style={{ backgroundColor: 'var(--color-chart-2)' }} />
          {ownLabel}
        </LegendItem>
        <LegendItem>
          <LegendSwatch style={{ backgroundColor: 'var(--color-chart-1)' }} />
          {competitorLabel}
        </LegendItem>
      </Legend>

      {unplaced.length > 0 && (
        <Notice>
          {unplacedLabel}: {unplaced.map((item) => item.label).join(', ')}
        </Notice>
      )}
    </Frame>
  );
};
