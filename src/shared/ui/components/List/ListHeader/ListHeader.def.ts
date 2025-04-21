import { Filters } from 'shared/api/types';
import { ListItem } from '../ListItem/ListItem.def';

export interface ListHeaderProps {
  cols: ListItem[];
  onSort?: (column: string) => void;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc';
  filters: Filters;
  onFilter: (updatedFilters: Filters) => void;
}
