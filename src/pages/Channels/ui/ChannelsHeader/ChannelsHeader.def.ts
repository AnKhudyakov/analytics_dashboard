import { Dispatch, SetStateAction } from 'react';

export interface AnalyticsHeaderProps {
  content: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
