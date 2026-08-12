import { type ParseKeys } from 'i18next';
import { type ReactNode } from 'react';

import { type Filters, type SortOrder } from 'shared/api/types';

export interface Column<T> {
  key: string;
  titleKey: ParseKeys;
  renderCell: (row: T) => ReactNode;
  filterType?: 'range' | 'checkbox';
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: readonly Column<T>[];
  rows: readonly T[];
  total: number;
  getRowId: (row: T) => string;
  getRowHref: (row: T) => string;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  emptyText: string;
  sortBy: string;
  sortOrder: SortOrder;
  onSortChange: (columnKey: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}
