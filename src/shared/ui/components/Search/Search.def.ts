import { ChangeEvent } from 'react';

export interface SearchProps {
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
