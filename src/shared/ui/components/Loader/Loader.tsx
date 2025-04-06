import { FC } from 'react';

import { LoaderContainer, StyledLoader } from './Loader.styles';

export const Loader: FC<{}> = () => {
  return (
    <LoaderContainer>
      <div role="status">
        <StyledLoader />
        <span className="sr-only">Loading...</span>
      </div>
    </LoaderContainer>
  );
};
