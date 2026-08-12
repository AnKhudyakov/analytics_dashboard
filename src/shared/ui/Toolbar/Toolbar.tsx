import { type FC, type ReactNode } from 'react';

import { Container } from './Toolbar.styles';

export interface ToolbarProps {
  direction?: 'row' | 'column';
  className?: string;
  children: ReactNode;
}

export const Toolbar: FC<ToolbarProps> = ({
  direction = 'row',
  className,
  children,
}) => (
  <Container
    className={[
      direction === 'row' ? 'flex-row' : 'flex-col-reverse',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </Container>
);
