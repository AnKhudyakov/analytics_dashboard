import { ButtonHTMLAttributes, FC } from 'react';
import { Button } from 'shared/ui/components/Button';
import { ExitIcon } from './ButtonExit.styles';

interface ButtonExitProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonExit: FC<ButtonExitProps> = (props) => {
  return (
    <Button icon {...props}>
      <ExitIcon width={34} height={34} />
    </Button>
  );
};
