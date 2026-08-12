import { type FC, type ReactNode } from 'react';

import { Container, FlexContainer } from './Card.styles';

export interface CardProps {
  className?: string;
  children: ReactNode;
  flex?: boolean;
}

export const Card: FC<CardProps> = ({ className, children, flex }) => {
  const Tag = flex ? FlexContainer : Container;
  return <Tag className={className}>{children}</Tag>;
};
