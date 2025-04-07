import { Dispatch, SetStateAction } from 'react';

export interface PageHeaderProps {
  content: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
