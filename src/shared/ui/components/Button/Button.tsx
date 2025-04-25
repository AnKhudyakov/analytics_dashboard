import { FC } from 'react';
import { hoverEffect } from 'shared/ui/effects';
import { ButtonProps } from './Button.def';
import { StyledButton, StyledButtonIcon } from './Button.styles';

export const Button: FC<ButtonProps> = ({ icon, children, ...props }) => {
  return (
    <>
      {icon ? (
        <StyledButtonIcon {...props}>{children}</StyledButtonIcon>
      ) : (
        <StyledButton {...props} className={hoverEffect}>
          {children}
        </StyledButton>
      )}
    </>
  );
};
