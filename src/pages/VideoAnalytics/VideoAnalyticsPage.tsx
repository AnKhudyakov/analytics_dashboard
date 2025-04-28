import { useGetVideoAnalyticsQuery } from 'entities/video';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card } from 'shared/ui/components/Card';
import { CustomTagsCloud } from 'shared/ui/components/CustomTagsCloud/CustomTagsCloud';
import { Error } from 'shared/ui/components/Error';
import { VideoAnalyticsSkeleton } from './VideoAnalyticsPage.skeleton';
import { Container } from './VideoAnalyticsPage.styles';
import { VideoAnalytics } from './ui/VideoAnalytics';
import { VideoCard } from './ui/VideoCard';

export const VideoAnalyticsPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const {
    data: video,
    isFetching,
    error,
    refetch,
  } = useGetVideoAnalyticsQuery(videoId, {
    skip: Boolean(!videoId),
  });
  const { t } = useTranslation();

  if (isFetching) return <VideoAnalyticsSkeleton />;

  return (
    <Container>
      {error || !video ? (
        <Card className="py-10">
          <Error
            text={t('shared.errorLoading')}
            onError={() => refetch()}
            disabled={isFetching}
          />
        </Card>
      ) : (
        <>
          <VideoCard
            title={video.snippet.title}
            description={video.snippet.description}
            banner={video.snippet.thumbnails.high.url}
            customUrl={video.snippet.customUrl}
          />
          <VideoAnalytics analytics={video.stats} />
          {video.snippet.tags && <CustomTagsCloud tags={video.snippet.tags} />}
        </>
      )}
    </Container>
  );
};
