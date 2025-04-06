import { FC } from 'react';
import { TypographyProps } from './Typography.def';
import { Body, Subtitle, Title } from './Typography.styles';

export const Typography: FC<TypographyProps> = ({
  variant = 'body',
  className,
  children,
}) => {
  const Tag =
    variant === 'title' ? Title : variant === 'subtitle' ? Subtitle : Body;
  return <Tag className={className}>{children}</Tag>;
};
