import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetVideoAnalyticsQuery, VideoCard } from 'entities/video';
import { routerPaths } from 'shared/constants';
import { Card } from 'shared/ui/Card';
import { Error } from 'shared/ui/Error';
import { SkeletonStack } from 'shared/ui/SkeletonStack';
import { TagsCloud } from 'shared/ui/TagsCloud';
import { VideoAnalytics } from 'widgets/video-analytics';

import { Container } from './VideoAnalyticsPage.styles';

const SKELETON_HEIGHTS = [280, 418, 418, 195];

export const VideoAnalyticsPage = () => {
  const { t } = useTranslation();
  const { videoId } = useParams<{ videoId: string }>();
  const {
    data: video,
    isFetching,
    isError,
    refetch,
  } = useGetVideoAnalyticsQuery(videoId ?? '', { skip: !videoId });

  if (isFetching) return <SkeletonStack heights={SKELETON_HEIGHTS} />;

  return (
    <Container>
      {isError || !video ? (
        <Card className="py-10">
          <Error
            text={t('shared.errorLoading')}
            onRetry={() => void refetch()}
            isRetrying={isFetching}
          />
        </Card>
      ) : (
        <>
          <VideoCard video={video} />
          <VideoAnalytics stats={video.stats} />
          {video.snippet.tags && video.snippet.tags.length > 0 && (
            <TagsCloud
              tags={video.snippet.tags}
              buildHref={(tag) =>
                `${routerPaths.VIDEOS}?search=${encodeURIComponent(tag)}`
              }
            />
          )}
        </>
      )}
    </Container>
  );
};
