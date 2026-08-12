import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Skeleton } from 'shared/ui/Skeleton';

import { Container } from './SkeletonStack.styles';

export interface SkeletonStackProps {
  heights: readonly number[];
}

export const SkeletonStack: FC<SkeletonStackProps> = ({ heights }) => {
  const { t } = useTranslation();

  return (
    <Container role="status" aria-label={t('shared.loading')}>
      {heights.map((height, index) => (
        <Skeleton key={index} height={height} />
      ))}
    </Container>
  );
};
