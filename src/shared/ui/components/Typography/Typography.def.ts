import { ReactNode } from 'react';

export interface ITypographyProps {
  variant?: 'body' | 'title' | 'subtitle';
  className?: string;
  children: ReactNode;
}
