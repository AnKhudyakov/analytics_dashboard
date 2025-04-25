import { Filters } from 'shared/api/types';
import { ListItem } from '../ListItem/ListItem.def';

export interface ListBodyProps {
  isLoading: boolean;
  error: boolean;
  onError?: () => void;
  data: {
    items: ListItem[];
    ids: string[];
    count: number;
  };
  viewPath: string;
  emptyText?: string;
  onFilter: (updatedFilters: Filters) => void;
  hasFilters: boolean;
}
