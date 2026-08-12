import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'shared/ui/Button';
import { ButtonLoader } from 'shared/ui/ButtonLoader';
import { Typography } from 'shared/ui/Typography';

import { Container } from './Error.styles';

export interface ErrorProps {
  text: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const Error: FC<ErrorProps> = ({ text, onRetry, isRetrying }) => {
  const { t } = useTranslation();

  return (
    <Container role="alert">
      <Typography variant="subtitle">{text}</Typography>
      {onRetry && (
        <Button onClick={onRetry} disabled={isRetrying}>
          {isRetrying ? (
            <ButtonLoader width={20} height={20} aria-hidden />
          ) : (
            t('shared.reload')
          )}
        </Button>
      )}
    </Container>
  );
};
