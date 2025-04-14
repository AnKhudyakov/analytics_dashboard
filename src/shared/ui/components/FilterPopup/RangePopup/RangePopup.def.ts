import { Filters } from 'shared/api/types';

export interface RangePopupProps {
  filterKey: keyof Filters;
  filters: Filters;
  onFilter: (updatedFilters: Filters) => void;
  onClose: () => void;
}
