import { FC } from 'react';

import { LoaderContainer, StyledLoader } from './Loader.styles';

export const Loader: FC<{ width?: number; height?: number }> = ({
  width = 80,
  height = 80,
}) => {
  return (
    <LoaderContainer>
      <div role="status">
        <StyledLoader width={width} height={height} />
        <span className="sr-only">Loading...</span>
      </div>
    </LoaderContainer>
  );
};
