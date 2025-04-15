import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ContainerSkeleton } from './ChannelAnalyticsPage.styles';

export const ChannelAnalyticsSkeleton = () => {
  return (
    <ContainerSkeleton>
      <SkeletonTheme baseColor="#0b1739" highlightColor="#343b4f">
        <Skeleton height={280} borderRadius="0.5rem" />
        <Skeleton height={406} borderRadius="0.5rem" />
        <Skeleton height={392} borderRadius="0.5rem" />
      </SkeletonTheme>
    </ContainerSkeleton>
  );
};
