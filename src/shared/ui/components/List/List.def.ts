import { ReactNode } from 'react';
import { Filters } from 'shared/api/types';
import { ListItem } from './ListItem/ListItem.def';

export interface ListProps {
  data: { items: ListItem[]; count: number; ids: string[] };
  isLoading: boolean;
  emptyText: string;
  viewPath: string;
  onSort?: (column: string) => void;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc';
  filters: Filters;
  onFilter: (updatedFilters: Filters) => void;
}
