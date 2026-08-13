import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { COMPARE_METRICS, type CompareMetric } from 'entities/insights';
import { useGetProfileQuery } from 'entities/profile';
import { Error } from 'shared/ui/Error';
import { type TabItem, Tabs } from 'shared/ui/Tabs';
import { Typography } from 'shared/ui/Typography';
import {
  ChannelCompare,
  ChannelCompareSkeleton,
} from 'widgets/channel-compare';

import { Container, Notice, Panel } from './ComparePage.styles';

const MIN_CHANNELS = 2;

export const ComparePage = () => {
  const { t } = useTranslation();
  const [metric, setMetric] = useState<CompareMetric>('subscriberCount');
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  const metricTabs = useMemo<TabItem<CompareMetric>[]>(
    () =>
      COMPARE_METRICS.map(({ key, labelKey }) => ({
        id: key,
        label: t(labelKey),
      })),
    [t]
  );

  const channels = [profile?.channel, ...(profile?.competitors ?? [])].filter(
    (channel) => channel !== null && channel !== undefined
  );

  const comparesChannels =
    !isError && (isLoading || channels.length >= MIN_CHANNELS);

  const content = () => {
    if (isLoading) return <ChannelCompareSkeleton />;

    if (isError || !profile) {
      return (
        <Panel>
          <Error
            text={t('shared.errorLoading')}
            onRetry={() => void refetch()}
          />
        </Panel>
      );
    }

    if (channels.length < MIN_CHANNELS) {
      return (
        <Panel>
          <Notice>{t('compare.needCompetitors')}</Notice>
        </Panel>
      );
    }

    return (
      <ChannelCompare
        channels={channels}
        metric={metric}
        ownId={profile.channel?.id}
      />
    );
  };

  return (
    <Container>
      <Typography variant="title">{t('compare.title')}</Typography>
      {comparesChannels && (
        <Tabs
          tabs={metricTabs}
          active={metric}
          onChange={setMetric}
          label={t('compare.metric')}
        />
      )}
      {content()}
    </Container>
  );
};
