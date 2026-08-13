import { useTranslation } from 'react-i18next';

import { type Filters, type SortOrder } from 'shared/api/types';
import { Button } from 'shared/ui/Button';
import { FilterPopup } from 'shared/ui/FilterPopup';
import { Icons } from 'shared/ui/icons';

import {
  FilterIcon,
  HeaderContent,
  SortButton,
  SortLabel,
} from './TableHeaderCell.styles';
import { type Column } from './types';

interface TableHeaderCellProps<T> {
  column: Column<T>;
  sortBy: string;
  sortOrder: SortOrder;
  onSortChange: (columnKey: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  isFilterOpen: boolean;
  onFilterToggle: (columnKey: string | null) => void;
}

export const TableHeaderCell = <T,>({
  column,
  sortBy,
  sortOrder,
  onSortChange,
  filters,
  onFiltersChange,
  isFilterOpen,
  onFilterToggle,
}: TableHeaderCellProps<T>) => {
  const { t } = useTranslation();
  const isSorted = sortBy === column.key;
  const hasFilter = Boolean(filters[column.key]);
  const title = t(column.titleKey);

  return (
    <HeaderContent>
      {column.filterType && (
        <Button
          icon
          aria-label={t('shared.filterBy', { column: title })}
          aria-expanded={isFilterOpen}
          onClick={() => onFilterToggle(isFilterOpen ? null : column.key)}
        >
          <FilterIcon width={24} height={24} $active={hasFilter} aria-hidden />
        </Button>
      )}
      <SortButton
        type="button"
        title={title}
        onClick={() => onSortChange(column.key)}
      >
        <SortLabel>{title}</SortLabel>
        {isSorted &&
          (sortOrder === 'asc' ? (
            <Icons.sortASC
              width={20}
              height={20}
              className="shrink-0"
              aria-hidden
            />
          ) : (
            <Icons.sortDESC
              width={20}
              height={20}
              className="shrink-0"
              aria-hidden
            />
          ))}
      </SortButton>
      {column.filterType && isFilterOpen && (
        <FilterPopup
          type={column.filterType}
          filterKey={column.key}
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClose={() => onFilterToggle(null)}
          label={t('shared.filterBy', { column: title })}
        />
      )}
    </HeaderContent>
  );
};
