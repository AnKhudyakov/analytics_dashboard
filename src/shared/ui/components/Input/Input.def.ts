import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  search?: boolean;
  endIcon?: ReactNode;
  onEndIconClick?: () => void;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
