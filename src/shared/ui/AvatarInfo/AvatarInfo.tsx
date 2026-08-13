import { type FC } from 'react';

import { LazyImage } from 'shared/ui/LazyImage';

import { Avatar, Container, Name } from './AvatarInfo.styles';

export interface AvatarInfoProps {
  src: string;
  name: string;
}

export const AvatarInfo: FC<AvatarInfoProps> = ({ src, name }) => (
  <Container>
    <Avatar>
      <LazyImage src={src} alt="" aria-hidden />
    </Avatar>
    <Name title={name}>{name}</Name>
  </Container>
);
