import { type ButtonHTMLAttributes, type FC } from 'react';

import { Button } from 'shared/ui/Button';

import { ExitIcon } from './ButtonExit.styles';

type ButtonExitProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  label: string;
};

export const ButtonExit: FC<ButtonExitProps> = ({ label, ...props }) => (
  <Button icon aria-label={label} {...props}>
    <ExitIcon width={34} height={34} aria-hidden />
  </Button>
);
