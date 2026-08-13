import { type FC, type ReactNode } from 'react';

import { Frame } from './ChartFrame.styles';

interface ChartFrameProps {
  children: ReactNode;
  size?: 'sm' | 'md';
}

export const ChartFrame: FC<ChartFrameProps> = ({ children, size = 'md' }) => (
  <Frame $size={size}>{children}</Frame>
);
