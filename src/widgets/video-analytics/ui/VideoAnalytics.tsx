import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { type VideoStats } from 'entities/video';
import { lastValueOf, trendOf } from 'shared/lib/formatters';
import { BarChart } from 'shared/ui/BarChart';
import { Card } from 'shared/ui/Card';
import { Chart } from 'shared/ui/Chart';
import { MetricInfo } from 'shared/ui/MetricInfo';

import { Column, Divider, MetricRow } from './VideoAnalytics.styles';

export interface VideoAnalyticsProps {
  stats: readonly VideoStats[];
}

export const VideoAnalytics: FC<VideoAnalyticsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const rolling = useMemo(() => trendOf(stats, 'rollingRevenue'), [stats]);
  const revenue = useMemo(() => trendOf(stats, 'estimatedRevenueUsd'), [stats]);
  const views = useMemo(() => trendOf(stats, 'viewCount'), [stats]);

  return (
    <>
      <Card className="sm:flex">
        <Column>
          <MetricInfo
            title={t('metrics.rollingRevenue')}
            metric={lastValueOf(stats, 'rollingRevenue')}
            trend={rolling}
          />
          <Chart
            data={stats}
            series={[
              {
                field: 'rollingRevenue',
                color: 'var(--color-chart-4)',
                label: t('metrics.rollingRevenue'),
              },
              {
                field: 'rollingLowRevenue',
                color: 'var(--color-chart-2)',
                label: t('metrics.rollingLowRevenue'),
              },
              {
                field: 'rollingHighRevenue',
                color: 'var(--color-chart-1)',
                label: t('metrics.rollingHighRevenue'),
              },
            ]}
          />
        </Column>
        <Divider />
        <Column>
          <MetricInfo
            title={t('metrics.revenue')}
            metric={lastValueOf(stats, 'estimatedRevenueUsd')}
            trend={revenue}
          />
          <BarChart
            data={stats}
            series={[
              {
                field: 'estimatedRevenueUsd',
                color: 'var(--color-chart-2)',
                label: t('metrics.revenue'),
              },
              {
                field: 'estimatedLowRevenueUsd',
                color: 'var(--color-chart-4)',
                label: t('metrics.lowRevenue'),
              },
              {
                field: 'estimatedHighRevenueUsd',
                color: 'var(--color-chart-1)',
                label: t('metrics.highRevenue'),
              },
            ]}
          />
        </Column>
      </Card>
      <Card>
        <MetricRow>
          <MetricInfo
            title={t('metrics.views')}
            metric={lastValueOf(stats, 'viewCount')}
            trend={views}
          />
        </MetricRow>
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
      </Card>
    </>
  );
};
