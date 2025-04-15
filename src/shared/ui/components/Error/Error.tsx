import { FC } from 'react';
import { Button } from 'shared/ui/components/Button';
import { ButtonLoader } from 'shared/ui/components/ButtonLoader';
import { Typography } from 'shared/ui/components/Typography';
import { ErrorProps } from './Error.def';
import { Container } from './Error.styles';

export const Error: FC<ErrorProps> = ({
  className,
  text,
  onError,
  disabled,
}) => {
  return (
    <Container>
      <Typography variant="subtitle" className={className}>
        {text}
      </Typography>
      <Button onClick={onError} disabled={disabled}>
        {' '}
        {disabled ? <ButtonLoader width={20} height={20} /> : 'Reload'}{' '}
      </Button>
    </Container>
  );
};
