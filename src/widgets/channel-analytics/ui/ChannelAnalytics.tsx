import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { type ChannelStats } from 'entities/channel';
import { lastValueOf, trendOf } from 'shared/lib/formatters';
import { BarChart } from 'shared/ui/BarChart';
import { Card } from 'shared/ui/Card';
import { Chart } from 'shared/ui/Chart';
import { MetricInfo } from 'shared/ui/MetricInfo';

import { Column, Divider, MetricRow } from './ChannelAnalytics.styles';

export interface ChannelAnalyticsProps {
  stats: readonly ChannelStats[];
}

const WEEKLY_DAY = 'MONDAY';

export const ChannelAnalytics: FC<ChannelAnalyticsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const weekly = useMemo(
    () => stats.filter((entry) => entry.dayOfWeek === WEEKLY_DAY),
    [stats]
  );

  const videos = useMemo(() => trendOf(stats, 'videoCount'), [stats]);
  const subscribers = useMemo(() => trendOf(stats, 'subscriberCount'), [stats]);
  const views = useMemo(() => trendOf(stats, 'viewCount'), [stats]);
  const revenue = useMemo(() => trendOf(stats, 'estimatedRevenueUsd'), [stats]);

  return (
    <>
      <Card className="sm:flex">
        <Column>
          <MetricInfo
            title={t('metrics.videos')}
            metric={lastValueOf(stats, 'videoCount')}
            trend={videos}
          />
          <Chart
            data={weekly}
            series={[
              {
                field: 'videoCount',
                color: 'var(--color-chart-2)',
                label: t('metrics.videosCount'),
              },
            ]}
          />
        </Column>
        <Divider />
        <Column>
          <MetricRow>
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
          </MetricRow>
          <Chart
            data={stats}
            biaxial
            series={[
              {
                field: 'subscriberCount',
                color: 'var(--color-chart-1)',
                label: t('metrics.subscribers'),
              },
              {
                field: 'viewCount',
                color: 'var(--color-chart-2)',
                label: t('metrics.views'),
              },
            ]}
          />
        </Column>
      </Card>
      <Card>
        <MetricInfo
          title={t('metrics.revenue')}
          metric={lastValueOf(stats, 'estimatedRevenueUsd')}
          trend={revenue}
        />
        <BarChart
          data={weekly}
          series={[
            {
              field: 'estimatedRevenueUsd',
              color: 'var(--color-chart-2)',
              label: t('metrics.revenue'),
            },
            {
              field: 'estimatedLowRevenueUsd',
              color: 'var(--color-chart-3)',
              label: t('metrics.lowRevenue'),
            },
            {
              field: 'estimatedHighRevenueUsd',
              color: 'var(--color-chart-1)',
              label: t('metrics.highRevenue'),
            },
          ]}
        />
      </Card>
    </>
  );
};
