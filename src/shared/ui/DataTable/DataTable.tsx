import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { hoverEffect } from 'shared/ui/effects';

import {
  BodyCell,
  BodyRow,
  HeaderCell,
  HeaderRow,
  StatusCell,
  Table,
  TableContainer,
  TableHead,
} from './DataTable.styles';
import { MobileTable } from './MobileTable';
import { TableHeaderCell } from './TableHeaderCell';
import { TableStatus, type TableStatusKind } from './TableStatus';
import { type Column, type DataTableProps } from './types';

const statusOf = ({
  isLoading,
  isError,
  isEmpty,
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}): TableStatusKind | null => {
  if (isLoading) return 'loading';
  if (isError) return 'error';
  if (isEmpty) return 'empty';
  return null;
};

export const DataTable = <T,>({
  columns,
  rows,
  total,
  getRowId,
  getRowHref,
  isLoading,
  isError,
  onRetry,
  emptyText,
  sortBy,
  sortOrder,
  onSortChange,
  filters,
  onFiltersChange,
}: DataTableProps<T>) => {
  const { t } = useTranslation();
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);

  const status = statusOf({ isLoading, isError, isEmpty: rows.length === 0 });
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const statusNode = status && (
    <TableStatus
      kind={status}
      emptyText={emptyText}
      onRetry={onRetry}
      onClearFilters={() => onFiltersChange({})}
      canClearFilters={activeFilterCount > 0}
    />
  );

  return (
    <TableContainer>
      <Table $stretch={Boolean(status)}>
        <caption className="sr-only">{t('shared.tableCaption')}</caption>
        <TableHead>
          <HeaderRow>
            {columns.map((column, index) => (
              <HeaderCell
                key={column.key}
                scope="col"
                $first={index === 0}
                aria-sort={
                  sortBy === column.key
                    ? sortOrder === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
              >
                <TableHeaderCell
                  column={column}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={onSortChange}
                  filters={filters}
                  onFiltersChange={onFiltersChange}
                  isFilterOpen={openFilterKey === column.key}
                  onFilterToggle={setOpenFilterKey}
                />
              </HeaderCell>
            ))}
          </HeaderRow>
        </TableHead>
        <tbody>
          {statusNode ? (
            <tr>
              <StatusCell colSpan={columns.length}>{statusNode}</StatusCell>
            </tr>
          ) : (
            rows.map((row) => (
              <TableBodyRow
                key={getRowId(row)}
                row={row}
                columns={columns}
                href={getRowHref(row)}
              />
            ))
          )}
        </tbody>
      </Table>

      <MobileTable
        columns={columns}
        rows={rows}
        getRowId={getRowId}
        getRowHref={getRowHref}
        status={status}
        statusNode={statusNode}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      <span className="sr-only" aria-live="polite">
        {t('shared.totalResults', { count: total })}
      </span>
    </TableContainer>
  );
};

interface TableBodyRowProps<T> {
  row: T;
  columns: readonly Column<T>[];
  href: string;
}

const TableBodyRowComponent = <T,>({
  row,
  columns,
  href,
}: TableBodyRowProps<T>) => (
  <BodyRow className={hoverEffect}>
    {columns.map((column, index) => (
      <BodyCell key={column.key} $first={index === 0}>
        {index === 0 ? (
          <Link to={href} className="block">
            {column.renderCell(row)}
          </Link>
        ) : (
          column.renderCell(row)
        )}
      </BodyCell>
    ))}
  </BodyRow>
);

const TableBodyRow = memo(
  TableBodyRowComponent
) as typeof TableBodyRowComponent;
