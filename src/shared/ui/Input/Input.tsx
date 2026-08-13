import { type ComponentPropsWithRef, type ReactNode, useId } from 'react';

import { Button } from 'shared/ui/Button';

import {
  Container,
  EndIconSlot,
  ErrorText,
  Field,
  Label,
  SearchIcon,
  StyledInput,
  StyledSearchInput,
} from './Input.styles';

export interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
  hideLabel?: boolean;
  search?: boolean;
  endIcon?: ReactNode;
  endIconLabel?: string;
  onEndIconClick?: () => void;
  error?: string;
}

export const Input = ({
  label,
  hideLabel = true,
  search,
  endIcon,
  endIconLabel,
  onEndIconClick,
  error,
  id,
  className,
  type = 'text',
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const Tag = search ? StyledSearchInput : StyledInput;

  return (
    <Field>
      <Label htmlFor={inputId} className={hideLabel ? 'sr-only' : undefined}>
        {label}
      </Label>
      <Container>
        {search && <SearchIcon width={16} height={15} aria-hidden />}
        <Tag
          {...props}
          id={inputId}
          type={type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={[endIcon ? 'pr-10' : '', className]
            .filter(Boolean)
            .join(' ')}
        />
        {endIcon && onEndIconClick && (
          <EndIconSlot>
            <Button
              icon
              aria-label={endIconLabel ?? label}
              onClick={onEndIconClick}
            >
              {endIcon}
            </Button>
          </EndIconSlot>
        )}
      </Container>
      <ErrorText id={errorId}>{error}</ErrorText>
    </Field>
  );
};
