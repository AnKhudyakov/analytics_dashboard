import { useTranslation } from 'react-i18next';

import { useGetProfileQuery } from 'entities/profile';
import { Error } from 'shared/ui/Error';
import { Typography } from 'shared/ui/Typography';
import {
  ChannelCompare,
  ChannelCompareSkeleton,
} from 'widgets/channel-compare';

import { Container, Notice, Panel } from './ComparePage.styles';

export const ComparePage = () => {
  const { t } = useTranslation();
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  const channels = [profile?.channel, ...(profile?.competitors ?? [])].filter(
    (channel) => channel !== null && channel !== undefined
  );

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

    if (channels.length < 2) {
      return (
        <Panel>
          <Notice>{t('compare.needCompetitors')}</Notice>
        </Panel>
      );
    }

    return <ChannelCompare channels={channels} ownId={profile.channel?.id} />;
  };

  return (
    <Container>
      <Typography variant="title">{t('compare.title')}</Typography>
      {content()}
    </Container>
  );
};
