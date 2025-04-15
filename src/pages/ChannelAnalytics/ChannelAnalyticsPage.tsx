import { useGetChannelAnalyticsQuery } from 'entities/channel';
import { useParams } from 'react-router-dom';
import { Card } from 'shared/ui/components/Card';
import { Error } from 'shared/ui/components/Error';
import { ChannelAnalyticsSkeleton } from './ChannelAnalytics.skeleton';
import { Container } from './ChannelAnalyticsPage.styles';
import { ChannelAnalytics } from './ui/ChannelAnalytics';
import { ChannelCard } from './ui/ChannelCard';

export const ChannelAnalyticsPage = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const {
    data: channel,
    isFetching,
    error,
    refetch,
  } = useGetChannelAnalyticsQuery(channelId, {
    skip: Boolean(!channelId),
  });

  if (isFetching) return <ChannelAnalyticsSkeleton />;

  return (
    <Container>
      {error || !channel ? (
        <Card className="py-10">
          <Error
            text="Error data loading"
            onError={() => refetch()}
            disabled={isFetching}
          />
        </Card>
      ) : (
        <>
          <ChannelCard
            title={channel.snippet.title}
            description={channel.snippet.description}
            avatar={channel.snippet.thumbnails.high.url}
            banner={channel.brandingSettings?.image?.bannerExternalUrl}
            customUrl={channel.snippet.customUrl}
          />
          <ChannelAnalytics analytics={channel.stats} />
        </>
      )}
    </Container>
  );
};
