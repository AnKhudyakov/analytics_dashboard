import { ReactNode } from 'react';

export interface PopupProps {
  onClose: () => void;
  children: ReactNode;
}
