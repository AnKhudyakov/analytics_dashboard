import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useThemeContext } from 'shared/context/ThemeContext';
import { ContainerSkeleton } from './ChannelAnalyticsPage.styles';

export const ChannelAnalyticsSkeleton = () => {
  const { mode } = useThemeContext();

  return (
    <ContainerSkeleton>
      <SkeletonTheme
        baseColor={mode === 'dark' ? '#0b1739' : '#fff'}
        highlightColor={mode === 'dark' ? '#343b4f' : '#aeb9e1'}
      >
        <Skeleton height={280} borderRadius="0.5rem" />
        <Skeleton height={406} borderRadius="0.5rem" />
        <Skeleton height={392} borderRadius="0.5rem" />
      </SkeletonTheme>
    </ContainerSkeleton>
  );
};
