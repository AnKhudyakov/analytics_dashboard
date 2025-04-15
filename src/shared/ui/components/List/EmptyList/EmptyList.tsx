import { FC } from 'react';
import { Button } from 'shared/ui/components/Button';
import { ButtonLoader } from 'shared/ui/components/ButtonLoader';
import { Typography } from 'shared/ui/components/Typography';
import { EmptyListProps } from './EmptyList.def';
import { Container } from './EmptyList.styles';

export const EmptyList: FC<EmptyListProps> = ({ text, onClear, disabled }) => {
  return (
    <Container>
      <Typography variant="subtitle">{text}</Typography>
      <Button onClick={onClear} disabled={disabled}>
        {disabled ? (
          <ButtonLoader width={20} height={20} />
        ) : (
          'Clear all filters'
        )}
      </Button>
    </Container>
  );
};
