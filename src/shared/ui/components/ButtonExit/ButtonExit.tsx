import { ButtonHTMLAttributes, FC } from 'react';
import { Button } from 'shared/ui/components/Button';
import { ExitIcon } from './ButtonExit.styles';

interface IButtonExitProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonExit: FC<IButtonExitProps> = (props) => {
  return (
    <Button icon {...props}>
      <ExitIcon width={30} height={30} />
    </Button>
  );
};
