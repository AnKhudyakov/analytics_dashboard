import { type FC, type ImgHTMLAttributes, useState } from 'react';

import { Skeleton } from 'shared/ui/Skeleton';

import { Frame, Image } from './LazyImage.styles';

export interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
}

export const LazyImage: FC<LazyImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>(
    'loading'
  );

  if (status === 'failed') return null;

  return (
    <Frame className={className}>
      {status === 'loading' && (
        <Skeleton className="absolute inset-0" height="100%" radius="inherit" />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('failed')}
        $loaded={status === 'loaded'}
      />
    </Frame>
  );
};
