import { FC, useRef } from 'react';
import { useOutsideClick } from 'shared/lib/hooks/useOutsideClick';
import { PopupProps } from './Popup.def';
import { Container } from './Popup.styles';

export const Popup: FC<PopupProps> = ({ onClose, children }) => {

  const popupRef = useRef<HTMLElement>(null);

  useOutsideClick(popupRef, onClose);

  return <Container ref={popupRef}>{children}</Container>;
};
