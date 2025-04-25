import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/components/Button';
import { Typography } from 'shared/ui/components/Typography';
import { EmptyListProps } from './EmptyList.def';
import { Container } from './EmptyList.styles';

export const EmptyList: FC<EmptyListProps> = ({ text, onClear, disabled }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="subtitle">{text}</Typography>
      <Button onClick={onClear} disabled={disabled}>
        {t('shared.clearAll')}
      </Button>
    </Container>
  );
};
