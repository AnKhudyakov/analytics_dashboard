import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  LoaderContainer,
  LoaderContent,
  LoaderText,
  LoaderWrapper,
} from './Loader.styles';

export const Loader: FC = () => {
  const { t } = useTranslation();

  return (
    <LoaderContainer role="status" aria-live="polite">
      <LoaderWrapper>
        <LoaderContent aria-hidden />
      </LoaderWrapper>
      <LoaderText>{t('shared.loading')}</LoaderText>
    </LoaderContainer>
  );
};
