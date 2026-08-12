import { type RefObject, useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void
) => {
  const callbackRef = useRef(onOutsideClick);
  callbackRef.current = onOutsideClick;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (ref.current && !ref.current.contains(target)) {
        callbackRef.current();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') callbackRef.current();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);
};
