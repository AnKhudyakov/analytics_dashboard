import { FC } from 'react';
import { Typography } from '../Typography';
import { AvatarInfoProps } from './AvatarInfo.def';
import { Avatar, Container } from './AvatarInfo.styles';

export const AvatarInfo: FC<AvatarInfoProps> = ({ src, alt, name }) => {
  return (
    <Container>
      <Avatar src={src} alt={alt} />
      <Typography variant="body">{name}</Typography>
    </Container>
  );
};
