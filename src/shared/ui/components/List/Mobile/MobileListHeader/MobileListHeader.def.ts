import { Filters } from 'shared/api/types';
import { Dispatch, SetStateAction } from 'react';
import { ListItem } from '../../ListItem/ListItem.def';

export interface MobileListHeaderProps {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  cols: ListItem[];
  onSort?: (column: string) => void;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc';
  filters: Filters;
  onFilter: (updatedFilters: Filters) => void;
}
