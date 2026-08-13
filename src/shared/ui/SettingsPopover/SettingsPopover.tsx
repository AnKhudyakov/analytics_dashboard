import { type FC, type ReactNode, useState } from 'react';

import { Button } from 'shared/ui/Button';
import { Icons } from 'shared/ui/icons';
import { Popup } from 'shared/ui/Popup';

import { Anchor, Wrapper } from './SettingsPopover.styles';

export interface SettingsPopoverProps {
  label: string;
  placement?: 'up' | 'down';
  children: ReactNode;
}

export const SettingsPopover: FC<SettingsPopoverProps> = ({
  label,
  placement = 'up',
  children,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Anchor>
      <Button
        icon
        aria-label={label}
        aria-expanded={isOpen}
        className="hover:opacity-50"
        onClick={() => setOpen((open) => !open)}
      >
        <Icons.settings width={22} height={22} aria-hidden />
      </Button>
      {isOpen && (
        <Wrapper $placement={placement}>
          <Popup onClose={() => setOpen(false)} label={label}>
            {children}
          </Popup>
        </Wrapper>
      )}
    </Anchor>
  );
};
