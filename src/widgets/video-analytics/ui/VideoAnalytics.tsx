import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetVideoEngagementQuery, type VideoStats } from 'entities/video';
import { compactNumber, lastValueOf, trendOf } from 'shared/lib/formatters';
import { BarChart } from 'shared/ui/BarChart';
import { Chart } from 'shared/ui/Chart';
import { ChartFrame } from 'shared/ui/ChartFrame';
import { FunnelSteps } from 'shared/ui/FunnelSteps';
import { MetricInfo } from 'shared/ui/MetricInfo';

import { CardTitle, Grid, KpiGrid, Panel } from './VideoAnalytics.styles';

export interface VideoAnalyticsProps {
  videoId: string;
  stats: readonly VideoStats[];
}

const STEP_LABELS = {
  views: 'metrics.views',
  likes: 'metrics.likes',
  comments: 'metrics.comments',
  favorites: 'columns.favorites',
} as const;

export const VideoAnalytics: FC<VideoAnalyticsProps> = ({ videoId, stats }) => {
  const { t } = useTranslation();
  const { data: engagement } = useGetVideoEngagementQuery(videoId);

  const rolling = useMemo(() => trendOf(stats, 'rollingRevenue'), [stats]);
  const revenue = useMemo(() => trendOf(stats, 'estimatedRevenueUsd'), [stats]);
  const views = useMemo(() => trendOf(stats, 'viewCount'), [stats]);

  const funnel = (engagement?.steps ?? [])
    .filter((step) => step.value > 0)
    .map((step) => ({
      key: step.key,
      label: t(STEP_LABELS[step.key as keyof typeof STEP_LABELS]),
      value: step.value,
      formattedValue: compactNumber(step.value),
    }));

  return (
    <Grid>
      <KpiGrid>
        <MetricInfo
          title={t('metrics.views')}
          metric={lastValueOf(stats, 'viewCount')}
          trend={views}
        />
        <MetricInfo
          title={t('metrics.revenue')}
          metric={lastValueOf(stats, 'estimatedRevenueUsd')}
          trend={revenue}
        />
        <MetricInfo
          title={t('metrics.rollingRevenue')}
          metric={lastValueOf(stats, 'rollingRevenue')}
          trend={rolling}
        />
        <MetricInfo
          title={t('metrics.engagementRate')}
          metric={
            engagement ? `${engagement.rates.engagementRate.toFixed(1)}%` : '—'
          }
        />
      </KpiGrid>

      <Panel>
        <CardTitle>{t('metrics.engagement')}</CardTitle>
        <FunnelSteps steps={funnel} caption={t('metrics.engagement')} />
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.views')}</CardTitle>
        <ChartFrame>
          <Chart
            data={stats}
            series={[
              {
                field: 'viewCount',
                color: 'var(--color-chart-1)',
                label: t('metrics.views'),
              },
            ]}
          />
        </ChartFrame>
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.rollingRevenue')}</CardTitle>
        <ChartFrame>
          <Chart
            data={stats}
            series={[
              {
                field: 'rollingRevenue',
                color: 'var(--color-chart-1)',
                label: t('metrics.rollingRevenue'),
              },
              {
                field: 'rollingLowRevenue',
                color: 'var(--color-chart-2)',
                label: t('metrics.rollingLowRevenue'),
              },
              {
                field: 'rollingHighRevenue',
                color: 'var(--color-chart-3)',
                label: t('metrics.rollingHighRevenue'),
              },
            ]}
          />
        </ChartFrame>
      </Panel>

      <Panel>
        <CardTitle>{t('metrics.revenue')}</CardTitle>
        <ChartFrame>
          <BarChart
            data={stats}
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
    </Grid>
  );
};
