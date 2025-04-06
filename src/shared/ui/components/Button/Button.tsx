import { FC } from 'react';
import { hoverEffect } from 'shared/ui/effects';
import { ButtonProps } from './Button.def';
import { StyledButton } from './Button.styles';

export const Button: FC<ButtonProps> = ({ icon, children, ...props }) => {
  return (
    <>
      {icon ? (
        <button {...props}>{children}</button>
      ) : (
        <StyledButton {...props} className={hoverEffect}>
          {children}
        </StyledButton>
      )}
    </>
  );
};
