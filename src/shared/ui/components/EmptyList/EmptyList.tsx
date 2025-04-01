import { FC } from 'react';
import { Typography } from '../Typography';
import { EmptyListProps } from './EmptyList.def';
import { Container } from './EmptyList.styles';

export const EmptyList: FC<EmptyListProps> = ({ text }) => {
  return (
    <Container>
      <Typography>{text}</Typography>
    </Container>
  );
};
