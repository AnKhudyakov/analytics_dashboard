import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  type Filters,
  type ResourceQuery,
  type SortOrder,
} from 'shared/api/types';
import {
  deserializeFilters,
  serializeFilters,
} from 'shared/lib/filters/serializeFilters';

export type TableParams = ResourceQuery;

export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;

interface UseTableParamsOptions {
  defaultSortBy: string;
  defaultSortOrder?: SortOrder;
  defaultLimit?: number;
}

export interface UseTableParamsResult {
  params: TableParams;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setFilters: (filters: Filters) => void;
  toggleSort: (column: string) => void;
}

const parsePositiveInt = (value: string | null, fallback: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const useTableParams = ({
  defaultSortBy,
  defaultSortOrder = 'asc',
  defaultLimit = ROWS_PER_PAGE_OPTIONS[0],
}: UseTableParamsOptions): UseTableParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo<TableParams>(() => {
    const limit = parsePositiveInt(searchParams.get('limit'), defaultLimit);
    const order = searchParams.get('order');

    return {
      page: parsePositiveInt(searchParams.get('page'), 1),
      limit: ROWS_PER_PAGE_OPTIONS.some((option) => option === limit)
        ? limit
        : defaultLimit,
      sortBy: searchParams.get('sort') ?? defaultSortBy,
      sortOrder: order === 'desc' ? 'desc' : defaultSortOrder,
      search: searchParams.get('search') ?? '',
      filters: deserializeFilters(searchParams.get('filters')),
    };
  }, [searchParams, defaultSortBy, defaultSortOrder, defaultLimit]);

  const patchParams = useCallback(
    (patch: Partial<TableParams>) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);

          if (patch.search !== undefined) {
            setOrDelete(next, 'search', patch.search);
          }
          if (patch.limit !== undefined) {
            setOrDelete(next, 'limit', String(patch.limit));
          }
          if (patch.sortBy !== undefined) {
            setOrDelete(next, 'sort', patch.sortBy);
          }
          if (patch.sortOrder !== undefined) {
            setOrDelete(next, 'order', patch.sortOrder);
          }
          if (patch.filters !== undefined) {
            const hasFilters = Object.values(patch.filters).some(Boolean);
            setOrDelete(
              next,
              'filters',
              hasFilters ? serializeFilters(patch.filters) : ''
            );
          }

          const resetsPage = patch.page === undefined;
          setOrDelete(
            next,
            'page',
            resetsPage || patch.page === 1 ? '' : String(patch.page)
          );

          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const toggleSort = useCallback(
    (column: string) => {
      const isSameColumn = column === params.sortBy;
      patchParams({
        sortBy: column,
        sortOrder: isSameColumn && params.sortOrder === 'asc' ? 'desc' : 'asc',
      });
    },
    [params.sortBy, params.sortOrder, patchParams]
  );

  return {
    params,
    setSearch: useCallback(
      (search: string) => patchParams({ search }),
      [patchParams]
    ),
    setPage: useCallback(
      (page: number) => patchParams({ page }),
      [patchParams]
    ),
    setLimit: useCallback(
      (limit: number) => patchParams({ limit }),
      [patchParams]
    ),
    setFilters: useCallback(
      (filters: Filters) => patchParams({ filters }),
      [patchParams]
    ),
    toggleSort,
  };
};

const setOrDelete = (target: URLSearchParams, key: string, value: string) => {
  if (value) {
    target.set(key, value);
  } else {
    target.delete(key);
  }
};
