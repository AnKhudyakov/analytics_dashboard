import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { type CompareMetric, useCompareChannelsQuery } from 'entities/insights';
import { type TrackedChannel } from 'entities/profile';
import { compactNumber } from 'shared/lib/formatters';
import { proxiedImageUrl } from 'shared/lib/images';
import { BarList } from 'shared/ui/BarList';
import { Chart } from 'shared/ui/Chart';
import {
  COMPETITOR_COLORS,
  OWN_SERIES_COLOR,
} from 'shared/ui/Chart/chartTheme';
import { ChartFrame } from 'shared/ui/ChartFrame';
import { Error } from 'shared/ui/Error';
import { LazyImage } from 'shared/ui/LazyImage';
import { type Pie3DSlice, PieChart3D } from 'shared/ui/PieChart3D';

import {
  Avatar,
  Card,
  CardDelta,
  CardHead,
  CardMeta,
  CardName,
  CardRow,
  CardTitle,
  CardValue,
  Dot,
  Grid,
  Notice,
  Panel,
  Row,
  SectionTitle,
  SmallRow,
  WidePanel,
} from './ChannelCompare.styles';
import { ChannelCompareSkeleton } from './ChannelCompareSkeleton';

const PERIOD_DAYS = 90;

export interface ChannelCompareProps {
  channels: readonly TrackedChannel[];
  metric: CompareMetric;
  ownId?: string | null;
}

export const ChannelCompare: FC<ChannelCompareProps> = ({
  channels,
  metric,
  ownId,
}) => {
  const { t } = useTranslation();

  const ids = useMemo(() => channels.map((channel) => channel.id), [channels]);

  const colorById = useMemo(() => {
    let rivals = 0;

    return new Map(
      channels.map((channel) => {
        if (channel.id === ownId) return [channel.id, OWN_SERIES_COLOR];
        const color =
          COMPETITOR_COLORS[rivals % COMPETITOR_COLORS.length] ??
          OWN_SERIES_COLOR;
        rivals += 1;
        return [channel.id, color];
      })
    );
  }, [channels, ownId]);

  const {
    data: comparison,
    isLoading,
    isError,
    refetch,
  } = useCompareChannelsQuery({ ids, metric, days: PERIOD_DAYS });

  const rows = useMemo(() => {
    if (!comparison) return [];

    return comparison.channels.map((channel) => {
      const series = comparison.points.map((point) => ({
        date: point.date,
        value: typeof point[channel.id] === 'number' ? point[channel.id] : null,
      }));
      const values = series
        .map((point) => point.value)
        .filter((value): value is number => typeof value === 'number');
      const first = values[0] ?? 0;
      const last = values[values.length - 1] ?? 0;

      return {
        ...channel,
        series,
        first,
        last,
        growth: first > 0 ? ((last - first) / first) * 100 : 0,
        color: colorById.get(channel.id) ?? OWN_SERIES_COLOR,
        tracked: channels.find((entry) => entry.id === channel.id),
      };
    });
  }, [comparison, colorById, channels]);

  const indexed = useMemo(() => {
    if (!comparison) return [];
    const base = new Map<string, number>();

    return comparison.points.map((point) => {
      const row: Record<string, string | number> = { date: point.date };

      comparison.channels.forEach(({ id }) => {
        const value = point[id];
        if (typeof value !== 'number') return;
        if (!base.has(id) && value > 0) base.set(id, value);
        const start = base.get(id);
        if (start) row[id] = Number(((value / start) * 100).toFixed(2));
      });

      return row;
    });
  }, [comparison]);

  const shareSlices = useMemo<Pie3DSlice[]>(() => {
    const own = rows.find((row) => row.id === ownId);
    const rivals = rows
      .filter((row) => row.id !== ownId)
      .reduce((sum, row) => sum + row.last, 0);

    if (!own) return [];

    return [
      {
        key: 'you',
        label: t('overview.you'),
        value: own.last,
        color: OWN_SERIES_COLOR,
      },
      {
        key: 'rivals',
        label: t('overview.competitors'),
        value: rivals,
        color: COMPETITOR_COLORS[0] ?? OWN_SERIES_COLOR,
      },
    ];
  }, [rows, ownId, t]);

  const efficiency = useMemo(
    () =>
      channels
        .map((channel) => {
          const perVideo =
            channel.videos > 0 ? Math.round(channel.views / channel.videos) : 0;

          return {
            key: channel.id,
            label: channel.title,
            value: perVideo,
            formattedValue: compactNumber(perVideo),
            color: colorById.get(channel.id) ?? OWN_SERIES_COLOR,
          };
        })
        .sort((a, b) => b.value - a.value),
    [channels, colorById]
  );

  if (isLoading) return <ChannelCompareSkeleton count={channels.length} />;

  if (isError || !comparison) {
    return (
      <Panel>
        <Error text={t('shared.errorLoading')} onRetry={() => void refetch()} />
      </Panel>
    );
  }

  return (
    <Grid>
      <CardRow aria-label={t('compare.cards')}>
        {rows.map((row) => (
          <Card key={row.id}>
            <CardHead>
              <Dot style={{ backgroundColor: row.color }} aria-hidden />
              {row.tracked?.thumbnail && (
                <Avatar>
                  <LazyImage
                    src={proxiedImageUrl(row.tracked.thumbnail)}
                    alt=""
                    aria-hidden
                  />
                </Avatar>
              )}
              <CardName>
                {row.title}
                {row.id === ownId ? ` · ${t('overview.you')}` : ''}
              </CardName>
            </CardHead>
            <CardValue>{compactNumber(row.last)}</CardValue>
            <CardDelta $positive={row.growth >= 0}>
              {row.growth >= 0 ? '+' : ''}
              {row.growth.toFixed(1)}% · {t('compare.period')}
            </CardDelta>
            {row.tracked?.country && <CardMeta>{row.tracked.country}</CardMeta>}
          </Card>
        ))}
      </CardRow>

      <Row>
        <WidePanel>
          <CardTitle>{t('compare.indexed')}</CardTitle>
          <Notice>{t('compare.indexedHint')}</Notice>
          <ChartFrame>
            <Chart
              data={indexed}
              series={rows.map((row) => ({
                field: row.id,
                color: row.color,
                label: row.title,
              }))}
            />
          </ChartFrame>
        </WidePanel>

        <Panel>
          <CardTitle>{t('compare.share')}</CardTitle>
          <Notice>{t('compare.shareHint')}</Notice>
          {shareSlices.length > 0 ? (
            <PieChart3D slices={shareSlices} caption={t('compare.share')} />
          ) : (
            <Notice>{t('overview.noChannel')}</Notice>
          )}
        </Panel>

        <Panel>
          <CardTitle>{t('compare.perVideo')}</CardTitle>
          <Notice>{t('compare.perVideoHint')}</Notice>
          <BarList items={efficiency} caption={t('compare.perVideo')} />
        </Panel>
      </Row>

      <SectionTitle>{t('compare.perChannel')}</SectionTitle>

      <SmallRow>
        {rows.map((row) => (
          <Panel key={row.id}>
            <CardHead>
              <Dot style={{ backgroundColor: row.color }} aria-hidden />
              <CardTitle>{row.title}</CardTitle>
            </CardHead>
            <Notice>
              {compactNumber(row.first)} → {compactNumber(row.last)}
            </Notice>
            <ChartFrame size="sm">
              <Chart
                hideValueAxis
                data={row.series}
                series={[
                  { field: 'value', color: row.color, label: row.title },
                ]}
              />
            </ChartFrame>
          </Panel>
        ))}
      </SmallRow>
    </Grid>
  );
};
