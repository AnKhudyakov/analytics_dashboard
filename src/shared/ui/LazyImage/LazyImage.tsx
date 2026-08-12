import { type FC, type ImgHTMLAttributes, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ContainerSkeleton, Image } from './LazyImage.styles';

export interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  skeletonHeight?: string | number;
  skeletonWidth?: string | number;
  borderRadius?: string | number;
}

export const LazyImage: FC<LazyImageProps> = ({
  src,
  alt,
  skeletonHeight = '100%',
  skeletonWidth = '100%',
  borderRadius = '0.5rem',
  className,
  ...props
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>(
    'loading'
  );

  if (status === 'failed') return null;

  return (
    <>
      {status === 'loading' && (
        <ContainerSkeleton>
          <Skeleton
            width={skeletonWidth}
            height={skeletonHeight}
            borderRadius={borderRadius}
          />
        </ContainerSkeleton>
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('failed')}
        className={[
          status === 'loaded' ? 'opacity-100' : 'opacity-0',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </>
  );
};
