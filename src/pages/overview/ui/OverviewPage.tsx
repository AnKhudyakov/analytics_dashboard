import { lazy, Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetChannelAnalyticsQuery } from 'entities/channel';
import {
  useGetInsightsCategoriesQuery,
  useGetInsightsCountriesQuery,
  useGetInsightsSummaryQuery,
} from 'entities/insights';
import { useGetProfileQuery } from 'entities/profile';
import { routerPaths } from 'shared/constants';
import { compactNumber, lastValueOf, trendOf } from 'shared/lib/formatters';
import { BarChart } from 'shared/ui/BarChart';
import { BarList } from 'shared/ui/BarList';
import { Chart } from 'shared/ui/Chart';
import { PIE_COLORS, PIE_OTHER_COLOR } from 'shared/ui/Chart/chartTheme';
import { ChartFrame } from 'shared/ui/ChartFrame';
import { Error } from 'shared/ui/Error';
import { MetricInfo } from 'shared/ui/MetricInfo';
import { type Pie3DSlice, PieChart3D } from 'shared/ui/PieChart3D';
import { Skeleton } from 'shared/ui/Skeleton';
import { Typography } from 'shared/ui/Typography';
import { type WorldMapMarker } from 'shared/ui/WorldMap';

import {
  CardTitle,
  ChartRow,
  Container,
  KpiRow,
  MapRow,
  Notice,
  Panel,
  WidePanel,
} from './OverviewPage.styles';
import { OverviewSkeleton } from './OverviewSkeleton';

const TOP_CATEGORIES = 4;
const MAP_HEIGHT = 320;

const WorldMap = lazy(() =>
  import('shared/ui/WorldMap').then((module) => ({ default: module.WorldMap }))
);

export const OverviewPage = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    refetch,
  } = useGetProfileQuery();

  const ownId = profile?.channel?.id;
  const { data: own, isLoading: isChannelLoading } =
    useGetChannelAnalyticsQuery(ownId ?? '', { skip: !ownId });

  const { data: summary, isLoading: isSummaryLoading } =
    useGetInsightsSummaryQuery();
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetInsightsCategoriesQuery();
  const { data: countries, isLoading: isCountriesLoading } =
    useGetInsightsCountriesQuery();

  const markers = useMemo<WorldMapMarker[]>(() => {
    if (!profile) return [];

    return [profile.channel, ...profile.competitors]
      .filter((channel) => channel !== null)
      .map((channel) => ({
        id: channel.id,
        label: channel.title,
        country: channel.country,
        value: channel.subscribers,
        href: `${routerPaths.CHANNELS}/${channel.id}`,
        isOwn: channel.id === profile.channel?.id,
      }));
  }, [profile]);

  const weekdays = useMemo(
    () =>
      (summary?.weekdayActivity ?? []).map((day) => ({
        weekday: t(
          `weekdays.${day.dayOfWeek.toLowerCase()}` as 'weekdays.monday'
        ),
        views: day.viewDelta,
      })),
    [summary, t]
  );

  const categorySlices = useMemo<Pie3DSlice[]>(() => {
    const ranked = categories ?? [];
    const rest = ranked
      .slice(TOP_CATEGORIES)
      .reduce((sum, entry) => sum + entry.views, 0);

    const slices = ranked.slice(0, TOP_CATEGORIES).map((entry, index) => ({
      key: entry.categoryId,
      label: entry.name,
      value: entry.views,
      color: PIE_COLORS[index] ?? PIE_OTHER_COLOR,
    }));

    return rest > 0
      ? [
          ...slices,
          {
            key: 'other',
            label: t('overview.otherCategories'),
            value: rest,
            color: PIE_OTHER_COLOR,
          },
        ]
      : slices;
  }, [categories, t]);

  const countryBars = useMemo(
    () =>
      (countries ?? []).map((entry) => ({
        label: entry.country,
        channels: entry.channels,
      })),
    [countries]
  );

  const isLoading =
    isProfileLoading ||
    isChannelLoading ||
    isSummaryLoading ||
    isCategoriesLoading ||
    isCountriesLoading;

  if (isLoading) {
    return (
      <Container>
        <Typography variant="title">{t('overview.title')}</Typography>
        <OverviewSkeleton />
      </Container>
    );
  }

  if (isProfileError || !profile) {
    return (
      <Container>
        <Typography variant="title">{t('overview.title')}</Typography>
        <Panel>
          <Error
            text={t('shared.errorLoading')}
            onRetry={() => void refetch()}
          />
        </Panel>
      </Container>
    );
  }

  const stats = own?.stats ?? [];

  const shareOfVoice = [profile.channel, ...profile.competitors]
    .filter((channel) => channel !== null)
    .map((channel) => ({
      key: channel.id,
      label:
        channel.id === profile.channel?.id
          ? `${channel.title} · ${t('overview.you')}`
          : channel.title,
      value: channel.subscribers,
      formattedValue: compactNumber(channel.subscribers),
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <Container>
      <Typography variant="title">{t('overview.title')}</Typography>

      {!profile.channel ? (
        <Panel>
          <Notice>{t('overview.noChannel')}</Notice>
        </Panel>
      ) : (
        <>
          <KpiRow>
            <MetricInfo
              compact
              title={t('metrics.subscribers')}
              metric={lastValueOf(stats, 'subscriberCount')}
              trend={trendOf(stats, 'subscriberCount')}
            />
            <MetricInfo
              compact
              title={t('metrics.views')}
              metric={lastValueOf(stats, 'viewCount')}
              trend={trendOf(stats, 'viewCount')}
            />
            <MetricInfo
              compact
              title={t('metrics.videos')}
              metric={lastValueOf(stats, 'videoCount')}
              trend={trendOf(stats, 'videoCount')}
            />
            <MetricInfo
              compact
              title={t('metrics.revenue')}
              metric={lastValueOf(stats, 'estimatedRevenueUsd')}
              trend={trendOf(stats, 'estimatedRevenueUsd')}
            />
            <MetricInfo
              compact
              title={t('overview.channelsTracked')}
              metric={compactNumber(summary?.totals.channels)}
            />
            <MetricInfo
              compact
              title={t('overview.videosTracked')}
              metric={compactNumber(summary?.totals.trackedVideos)}
            />
            <MetricInfo
              compact
              title={t('metrics.likes')}
              metric={compactNumber(summary?.totals.likes)}
            />
            <MetricInfo
              compact
              title={t('metrics.comments')}
              metric={compactNumber(summary?.totals.comments)}
            />
          </KpiRow>

          <MapRow>
            <WidePanel>
              <CardTitle>{t('overview.map')}</CardTitle>
              <Notice>{t('overview.mapHint')}</Notice>
              {markers.length > 0 ? (
                <Suspense fallback={<Skeleton height={MAP_HEIGHT} />}>
                  <WorldMap
                    markers={markers}
                    caption={t('overview.map')}
                    valueLabel={t('columns.subscribers')}
                    ownLabel={t('overview.you')}
                    competitorLabel={t('overview.competitors')}
                    unplacedLabel={t('overview.mapUnplaced')}
                    openLabel={t('overview.mapOpen')}
                    locale={locale}
                  />
                </Suspense>
              ) : (
                <Notice>{t('overview.noCompetitors')}</Notice>
              )}
            </WidePanel>

            <Panel>
              <CardTitle>{t('overview.topCategories')}</CardTitle>
              <Notice>{t('overview.topCategoriesHint')}</Notice>
              <PieChart3D
                slices={categorySlices}
                caption={t('overview.topCategories')}
              />
            </Panel>
          </MapRow>

          <ChartRow>
            <Panel>
              <CardTitle>{t('overview.subscribersTrend')}</CardTitle>
              <ChartFrame>
                <Chart
                  data={stats}
                  series={[
                    {
                      field: 'subscriberCount',
                      color: 'var(--color-chart-1)',
                      label: profile.channel.title,
                    },
                  ]}
                />
              </ChartFrame>
            </Panel>

            <Panel>
              <CardTitle>{t('metrics.weekdayActivity')}</CardTitle>
              <ChartFrame>
                <BarChart
                  data={weekdays}
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
              <CardTitle>{t('overview.byCountry')}</CardTitle>
              <ChartFrame>
                <BarChart
                  data={countryBars}
                  yScale="auto"
                  xAxisKey="label"
                  xAxisTick="label"
                  series={[
                    {
                      field: 'channels',
                      color: 'var(--color-chart-3)',
                      label: t('overview.channelsTracked'),
                    },
                  ]}
                />
              </ChartFrame>
            </Panel>

            <Panel>
              <CardTitle>{t('overview.shareOfVoice')}</CardTitle>
              <Notice>{t('overview.shareOfVoiceHint')}</Notice>
              {shareOfVoice.length > 1 ? (
                <BarList
                  items={shareOfVoice}
                  caption={t('overview.shareOfVoice')}
                />
              ) : (
                <Notice>{t('overview.noCompetitors')}</Notice>
              )}
            </Panel>
          </ChartRow>
        </>
      )}
    </Container>
  );
};
