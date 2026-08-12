import { type FC, type ReactNode, useRef } from 'react';

import { useOutsideClick } from 'shared/lib/hooks';

import { Container } from './Popup.styles';

export interface PopupProps {
  onClose: () => void;
  label?: string;
  children: ReactNode;
}

export const Popup: FC<PopupProps> = ({ onClose, label, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, onClose);

  return (
    <Container
      ref={popupRef}
      role="dialog"
      aria-label={label}
      aria-modal="false"
    >
      {children}
    </Container>
  );
};
