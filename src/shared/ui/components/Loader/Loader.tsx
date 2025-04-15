import { FC } from 'react';

import {
  Dot,
  DotAfter,
  DotInner,
  LoaderContainer,
  LoaderText,
  LoaderWrapper,
} from './Loader.styles';

export const Loader: FC<{ width?: number; height?: number }> = ({
  width = 80,
  height = 80,
}) => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        {Array.from({ length: 12 }).map((_, i) => (
          <Dot
            key={i}
            className={`origin-center
              z-[${Math.abs(6 - i)}]
              animation-delay-${i}
              dot-transform-${i}`}
          >
            <DotInner className={`animation-delay-${i}`} />
            <DotAfter className={`animation-delay-${i}`} />
          </Dot>
        ))}
        <LoaderText>Loading…</LoaderText>
      </LoaderWrapper>
    </LoaderContainer>
  );
};
