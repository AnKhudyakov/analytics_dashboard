import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';

import { StyledButton, StyledButtonIcon } from './Button.styles';

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = NativeButtonProps & { children: ReactNode } & (
    | { icon: true; 'aria-label': string }
    | { icon?: false }
  );

export const Button: FC<ButtonProps> = ({
  icon,
  children,
  className,
  type = 'button',
  ...props
}) => {
  if (icon) {
    return (
      <StyledButtonIcon type={type} className={className} {...props}>
        {children}
      </StyledButtonIcon>
    );
  }

  return (
    <StyledButton type={type} className={className} {...props}>
      {children}
    </StyledButton>
  );
};
