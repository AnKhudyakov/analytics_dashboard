import { type ReactNode, useEffect, useState } from 'react';

import { Loader } from 'shared/ui/Loader';

import { BootContent } from './BootGate.styles';

const MIN_BOOT_MS = 1500;

const bootElapsed = () =>
  typeof performance === 'undefined' ? MIN_BOOT_MS : performance.now();

export const BootGate = ({ children }: { children: ReactNode }) => {
  const [isHeld, setIsHeld] = useState(() => bootElapsed() < MIN_BOOT_MS);

  useEffect(() => {
    const remaining = Math.max(MIN_BOOT_MS - bootElapsed(), 0);
    const timer = setTimeout(() => setIsHeld(false), remaining);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isHeld && <Loader fullScreen />}
      <BootContent $hidden={isHeld} aria-hidden={isHeld || undefined}>
        {children}
      </BootContent>
    </>
  );
};
