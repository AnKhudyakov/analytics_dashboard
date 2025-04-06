import { ReactNode } from 'react';

export interface TypographyProps {
  variant?: 'body' | 'title' | 'subtitle';
  className?: string;
  children: ReactNode;
}
