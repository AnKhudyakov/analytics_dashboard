import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ChannelCard, useGetChannelAnalyticsQuery } from 'entities/channel';
import { Card } from 'shared/ui/Card';
import { Error } from 'shared/ui/Error';
import { SkeletonStack } from 'shared/ui/SkeletonStack';
import { ChannelAnalytics } from 'widgets/channel-analytics';

import { Container } from './ChannelAnalyticsPage.styles';

const SKELETON_HEIGHTS = [280, 406, 392];

export const ChannelAnalyticsPage = () => {
  const { t } = useTranslation();
  const { channelId } = useParams<{ channelId: string }>();
  const {
    data: channel,
    isFetching,
    isError,
    refetch,
  } = useGetChannelAnalyticsQuery(channelId ?? '', { skip: !channelId });

  if (isFetching) return <SkeletonStack heights={SKELETON_HEIGHTS} />;

  return (
    <Container>
      {isError || !channel ? (
        <Card className="py-10">
          <Error
            text={t('shared.errorLoading')}
            onRetry={() => void refetch()}
            isRetrying={isFetching}
          />
        </Card>
      ) : (
        <>
          <ChannelCard channel={channel} />
          <ChannelAnalytics stats={channel.stats} />
        </>
      )}
    </Container>
  );
};
