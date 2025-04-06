import { useGetChannelAnalyticsQuery } from 'entities/channel';
import { useParams } from 'react-router-dom';
import { Error } from 'shared/ui/components/Error';
import { Loader } from 'shared/ui/components/Loader';
import { Container } from './ChannelAnalyticsPage.styles';
import { ChannelAnalytics } from './ui/ChannelAnalytics';
import { ChannelCard } from './ui/ChannelCard';

export const ChannelAnalyticsPage = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const { data, isLoading, error } = useGetChannelAnalyticsQuery(channelId, {
    skip: Boolean(!channelId),
  });

  if (isLoading) return <Loader />;
  if (error || !data) return <Error text="Error data loading" />;
  const channel = data;

  return (
    <Container>
      <ChannelCard
        title={channel.snippet.title}
        description={channel.snippet.description}
        avatar={channel.snippet.thumbnails.high.url}
        banner={channel.brandingSettings?.image?.bannerExternalUrl}
        customUrl={channel.snippet.customUrl}
      />
      <ChannelAnalytics username={channel.snippet.customUrl} />
    </Container>
  );
};
