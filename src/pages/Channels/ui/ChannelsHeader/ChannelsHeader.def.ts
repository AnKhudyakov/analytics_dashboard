import { Dispatch, SetStateAction } from 'react';

export interface AnalyticsHeaderProps {
  content: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
