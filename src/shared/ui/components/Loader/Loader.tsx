import { FC } from 'react';

import {
  LoaderContainer,
  LoaderContent,
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
        <LoaderContent />
      </LoaderWrapper>
      <LoaderText>Loading</LoaderText>
    </LoaderContainer>
  );
};
