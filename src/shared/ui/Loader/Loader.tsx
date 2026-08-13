import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LoaderContainer,
  LoaderContent,
  LoaderText,
  LoaderWrapper,
} from './Loader.styles';

export interface LoaderProps {
  fullScreen?: boolean;
}

export const Loader: FC<LoaderProps> = ({ fullScreen }) => {
  const { t } = useTranslation();

  return (
    <LoaderContainer role="status" aria-live="polite" $fullScreen={fullScreen}>
      <LoaderWrapper>
        <LoaderContent aria-hidden />
      </LoaderWrapper>
      <LoaderText>{t('shared.loading')}</LoaderText>
    </LoaderContainer>
  );
};
