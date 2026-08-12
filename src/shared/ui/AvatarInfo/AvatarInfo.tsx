import { type FC } from 'react';

import { Typography } from 'shared/ui/Typography';

import { Avatar, Container } from './AvatarInfo.styles';

export interface AvatarInfoProps {
  src: string;
  name: string;
}

export const AvatarInfo: FC<AvatarInfoProps> = ({ src, name }) => (
  <Container>
    <Avatar src={src} alt="" loading="lazy" decoding="async" aria-hidden />
    <Typography variant="body">{name}</Typography>
  </Container>
);
