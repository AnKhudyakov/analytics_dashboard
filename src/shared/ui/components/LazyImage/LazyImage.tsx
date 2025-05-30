import { FC, ImgHTMLAttributes, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useThemeContext } from 'shared/context/ThemeContext';
import { ContainerSkeleton, Image } from './LazyImage.styles';

interface ILazyImageProps extends ImgHTMLAttributes<HTMLInputElement> {
  skeletonHeight?: string | number;
  skeletonWidth?: string | number;
  borderRadius?: string | number;
  className?: string;
}

export const LazyImage: FC<ILazyImageProps> = ({
  skeletonHeight = '100%',
  skeletonWidth = '100%',
  borderRadius = '0.5rem',
  className,
  ...props
}) => {
  const { mode } = useThemeContext();
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <>
      {!loaded && !errored && (
        <ContainerSkeleton>
          <SkeletonTheme
            baseColor={mode === 'dark' ? '#0b1739' : '#fff'}
            highlightColor={mode === 'dark' ? '#343b4f' : '#ffb86a'}
          >
            <Skeleton
              width={skeletonWidth}
              height={skeletonHeight}
              borderRadius={borderRadius}
            />
          </SkeletonTheme>
        </ContainerSkeleton>
      )}
      {!errored && (
        <Image
          src={props.src}
          alt={props.alt}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(true);
            setErrored(true);
          }}
          className={(loaded ? 'opacity-100 ' : 'opacity-0 ') + className}
        />
      )}
    </>
  );
};
