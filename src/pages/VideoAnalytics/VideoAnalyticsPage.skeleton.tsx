import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useThemeContext } from 'shared/context/ThemeContext';
import { ContainerSkeleton } from './VideoAnalyticsPage.styles';

export const VideoAnalyticsSkeleton = () => {
  const { mode } = useThemeContext();

  return (
    <ContainerSkeleton>
      <SkeletonTheme
        baseColor={mode === 'dark' ? '#0b1739' : '#fff'}
        highlightColor={mode === 'dark' ? '#343b4f' : '#ffb86a'}
      >
        <Skeleton height={280} borderRadius="0.5rem" />
        <Skeleton height={418} borderRadius="0.5rem" />
        <Skeleton height={418} borderRadius="0.5rem" />
        <Skeleton height={195} borderRadius="0.5rem" />
      </SkeletonTheme>
    </ContainerSkeleton>
  );
};
