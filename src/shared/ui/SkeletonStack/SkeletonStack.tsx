import 'react-loading-skeleton/dist/skeleton.css';

import { type FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Container } from './SkeletonStack.styles';

export interface SkeletonStackProps {
  heights: readonly number[];
}

export const SkeletonStack: FC<SkeletonStackProps> = ({ heights }) => (
  <Container>
    {heights.map((height, index) => (
      <Skeleton key={index} height={height} borderRadius="0.5rem" />
    ))}
  </Container>
);
