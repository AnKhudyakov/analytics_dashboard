import { useEffect, useState } from 'react';

import { useDebounce, type UseTableParamsResult } from 'shared/lib/hooks';
import { type Column, DataTable } from 'shared/ui/DataTable';
import { PageHeader } from 'shared/ui/PageHeader';
import { Pagination } from 'shared/ui/Pagination';

import { Container, TableArea } from './ResourceTable.styles';

interface ResourceTableProps<T> {
  title: string;
  emptyText: string;
  columns: readonly Column<T>[];
  rows: readonly T[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  getRowId: (row: T) => string;
  getRowHref: (row: T) => string;
  table: UseTableParamsResult;
}

export const ResourceTable = <T,>({
  title,
  emptyText,
  columns,
  rows,
  total,
  isLoading,
  isError,
  onRetry,
  getRowId,
  getRowHref,
  table,
}: ResourceTableProps<T>) => {
  const { params, setSearch, setPage, setLimit, setFilters, toggleSort } =
    table;
  const [searchInput, setSearchInput] = useState(params.search);
  const debouncedSearch = useDebounce(searchInput);

  useEffect(() => {
    if (debouncedSearch !== params.search) setSearch(debouncedSearch);
  }, [debouncedSearch, params.search, setSearch]);

  return (
    <Container>
      <PageHeader
        title={title}
        search={searchInput}
        onSearchChange={setSearchInput}
      />
      <TableArea>
        <DataTable
          columns={columns}
          rows={rows}
          total={total}
          getRowId={getRowId}
          getRowHref={getRowHref}
          isLoading={isLoading}
          isError={isError}
          onRetry={onRetry}
          emptyText={emptyText}
          sortBy={params.sortBy}
          sortOrder={params.sortOrder}
          onSortChange={toggleSort}
          filters={params.filters}
          onFiltersChange={setFilters}
        />
        <Pagination
          total={total}
          page={params.page}
          rowsPerPage={params.limit}
          onPageChange={setPage}
          onRowsPerPageChange={setLimit}
        />
      </TableArea>
    </Container>
  );
};
