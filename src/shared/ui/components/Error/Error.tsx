import { FC } from 'react';
import { Typography } from '../Typography';
import { ErrorProps } from './Error.def';
import { Container } from './Error.styles';

export const Error: FC<ErrorProps> = ({ className, text }) => {
  return (
    <Container>
      <Typography variant="subtitle" className={className}>
        {text}
      </Typography>
    </Container>
  );
};
