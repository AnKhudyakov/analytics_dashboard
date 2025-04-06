import { FC } from 'react';
import { CardProps } from './Card.def';
import { Container, FlexContainer } from './Card.styles';

export const Card: FC<CardProps> = ({ className, children, flex }) => {
  const Tag = flex ? FlexContainer : Container;
  return <Tag className={className}>{children}</Tag>;
};
