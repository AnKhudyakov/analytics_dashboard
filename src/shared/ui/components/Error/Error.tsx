import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/components/Button';
import { ButtonLoader } from 'shared/ui/components/ButtonLoader';
import { Typography } from 'shared/ui/components/Typography';
import { ErrorProps } from './Error.def';
import { Container } from './Error.styles';

export const Error: FC<ErrorProps> = ({ text, onError, disabled }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="subtitle">{text}</Typography>
      <Button onClick={onError} disabled={disabled}>
        {disabled ? <ButtonLoader width={20} height={20} /> : t('shared.reload')}
      </Button>
    </Container>
  );
};
