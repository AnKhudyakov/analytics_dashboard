import { type CSSProperties, type FC } from 'react';

export interface SkeletonProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  radius?: CSSProperties['borderRadius'];
  circle?: boolean;
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  radius = '0.5rem',
  circle,
  className,
}) => (
  <span
    aria-hidden
    className={['skeleton block', className].filter(Boolean).join(' ')}
    style={{ width, height, borderRadius: circle ? '50%' : radius }}
  />
);
