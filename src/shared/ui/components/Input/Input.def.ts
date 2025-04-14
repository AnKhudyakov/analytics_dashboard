import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  search?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
