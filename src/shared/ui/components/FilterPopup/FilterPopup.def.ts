import { Filters } from 'shared/api/types';

export interface FilterPopupProps {
  open: boolean;
  type?: string | undefined;
  filterKey: keyof Filters;
  filters: Filters;
  onFilter: (updatedFilters: Filters) => void;
  onClose: () => void;
}
