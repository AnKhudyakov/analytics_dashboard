import { Filters } from 'shared/api/types';

export interface CheckboxPopupProps {
  filterKey: keyof Filters;
  filters: Filters;
  onFilter: (updatedFilters: Filters) => void;
  onClose: () => void;
}
