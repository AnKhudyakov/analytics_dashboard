import { FC } from 'react';

import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <LoaderContainer>
      <LoaderWrapper>
        <LoaderContent />
      </LoaderWrapper>
      <LoaderText>{t('shared.loading')}</LoaderText>
    </LoaderContainer>
  );
};
