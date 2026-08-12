import { type FC, type ReactNode } from 'react';

import { Body, Subtitle, Title } from './Typography.styles';

export type TypographyVariant = 'body' | 'title' | 'subtitle';

export interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
}

const VARIANTS = {
  title: Title,
  subtitle: Subtitle,
  body: Body,
} as const;

export const Typography: FC<TypographyProps> = ({
  variant = 'body',
  className,
  children,
}) => {
  const Tag = VARIANTS[variant];
  return <Tag className={className}>{children}</Tag>;
};
