import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { hoverEffect } from 'shared/ui/effects';

import {
  BodyCell,
  BodyRow,
  HeaderCell,
  HeaderRow,
  StatusCell,
  StatusRow,
  Table,
  TableBody,
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
  scrollResetKey,
}: DataTableProps<T>) => {
  const { t } = useTranslation();
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);
  const bodyRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [scrollResetKey]);

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
      <Table role="table">
        <caption className="sr-only">{t('shared.tableCaption')}</caption>
        <TableHead role="rowgroup">
          <HeaderRow role="row">
            {columns.map((column, index) => (
              <HeaderCell
                key={column.key}
                role="columnheader"
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
        <TableBody ref={bodyRef} role="rowgroup">
          {statusNode ? (
            <StatusRow role="row">
              <StatusCell role="cell" colSpan={columns.length}>
                {statusNode}
              </StatusCell>
            </StatusRow>
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
        </TableBody>
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
        scrollResetKey={scrollResetKey}
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
  <BodyRow role="row" className={hoverEffect}>
    {columns.map((column, index) => (
      <BodyCell key={column.key} role="cell" $first={index === 0}>
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
