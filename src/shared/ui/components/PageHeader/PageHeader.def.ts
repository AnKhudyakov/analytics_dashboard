import { Dispatch, SetStateAction } from 'react';

export interface PageHeaderProps {
  content: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
