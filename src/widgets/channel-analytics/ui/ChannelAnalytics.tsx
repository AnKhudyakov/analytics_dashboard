import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type ChannelStats,
  useGetChannelAudienceQuery,
} from 'entities/channel';
import { lastValueOf, trendOf } from 'shared/lib/formatters';
import { BarChart } from 'shared/ui/BarChart';
import { BarList } from 'shared/ui/BarList';
import { Chart } from 'shared/ui/Chart';
import { ChartFrame } from 'shared/ui/ChartFrame';
import { DonutChart } from 'shared/ui/DonutChart';
import { MetricInfo } from 'shared/ui/MetricInfo';

import { CardTitle, Grid, KpiGrid, Panel } from './ChannelAnalytics.styles';

export interface ChannelAnalyticsProps {
  channelId: string;
  stats: readonly ChannelStats[];
}

const WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

export const ChannelAnalytics: FC<ChannelAnalyticsProps> = ({
  channelId,
  stats,
}) => {
  const { t } = useTranslation();
  const { data: audience } = useGetChannelAudienceQuery(channelId);

  const weekly = useMemo(
    () => stats.filter((entry) => entry.dayOfWeek === 'MONDAY'),
    [stats]
  );

  const byWeekday = useMemo(() => {
    const totals = new Map<string, number>(WEEK.map((day) => [day, 0]));
    stats.forEach((entry) => {
      if (!totals.has(entry.dayOfWeek)) return;
      totals.set(
        entry.dayOfWeek,
        (totals.get(entry.dayOfWeek) ?? 0) + entry.viewCountDelta
      );
    });
    return WEEK.map((day) => ({
      weekday: t(`weekdays.${day.toLowerCase()}` as 'weekdays.monday'),
      views: totals.get(day) ?? 0,
    }));
  }, [stats, t]);

  const subscribers = useMemo(() => trendOf(stats, 'subscriberCount'), [stats]);
  const views = useMemo(() => trendOf(stats, 'viewCount'), [stats]);
  const videos = useMemo(() => trendOf(stats, 'videoCount'), [stats]);
  const revenue = useMemo(() => trendOf(stats, 'estimatedRevenueUsd'), [stats]);

  const toSlices = (slices: { label: string; share: number }[] = []) =>
    slices.map((slice) => ({
      key: slice.label,
      label: slice.label,
      value: slice.share,
      formattedValue: `${slice.share}%`,
    }));

  return (
    <Grid>
      <KpiGrid>
        <MetricInfo
          title={t('metrics.subscribers')}
          metric={lastValueOf(stats, 'subscriberCount')}
          trend={subscribers}
        />
        <MetricInfo
          title={t('metrics.views')}
          metric={lastValueOf(stats, 'viewCount')}
          trend={views}
        />
        <MetricInfo
          title={t('metrics.videos')}
          metric={lastValueOf(stats, 'videoCount')}
          trend={videos}
        />
        <MetricInfo
          title={t('metrics.revenue')}
          metric={lastValueOf(stats, 'estimatedRevenueUsd')}
          trend={revenue}
        />
      </KpiGrid>

      <Panel>
        <CardTitle>{t('metrics.subscribers')}</CardTitle>
        <ChartFrame>
          <Chart
            data={stats}
            series={[
              {
                field: 'subscriberCount',
                color: 'var(--color-chart-1)',
                label: t('metrics.subscribers'),
              },
            ]}
          />
        </ChartFrame>
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.views')}</CardTitle>
        <ChartFrame>
          <Chart
            data={stats}
            series={[
              {
                field: 'viewCount',
                color: 'var(--color-chart-2)',
                label: t('metrics.views'),
              },
            ]}
          />
        </ChartFrame>
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.revenue')}</CardTitle>
        <ChartFrame>
          <BarChart
            data={weekly}
            series={[
              {
                field: 'estimatedRevenueUsd',
                color: 'var(--color-chart-1)',
                label: t('metrics.revenue'),
              },
              {
                field: 'estimatedLowRevenueUsd',
                color: 'var(--color-chart-2)',
                label: t('metrics.lowRevenue'),
              },
              {
                field: 'estimatedHighRevenueUsd',
                color: 'var(--color-chart-3)',
                label: t('metrics.highRevenue'),
              },
            ]}
          />
        </ChartFrame>
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.weekdayActivity')}</CardTitle>
        <ChartFrame>
          <BarChart
            data={byWeekday}
            yScale="auto"
            xAxisKey="weekday"
            xAxisTick="label"
            series={[
              {
                field: 'views',
                color: 'var(--color-chart-1)',
                label: t('metrics.viewsGained'),
              },
            ]}
          />
        </ChartFrame>
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.trafficSources')}</CardTitle>
        <DonutChart
          slices={toSlices(audience?.trafficSources)}
          caption={t('metrics.trafficSources')}
        />
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.devices')}</CardTitle>
        <BarList
          items={toSlices(audience?.devices)}
          caption={t('metrics.devices')}
        />
        <CardTitle className="mt-6">{t('metrics.ageGroups')}</CardTitle>
        <BarList
          items={toSlices(audience?.ageGroups)}
          caption={t('metrics.ageGroups')}
        />
      </Panel>
    </Grid>
  );
};
