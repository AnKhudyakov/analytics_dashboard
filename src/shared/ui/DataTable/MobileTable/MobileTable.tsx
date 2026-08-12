import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

import { type Filters, type SortOrder } from 'shared/api/types';
import { hoverEffect } from 'shared/ui/effects';
import { Icons } from 'shared/ui/icons';

import { TableHeaderCell } from '../TableHeaderCell';
import { type Column } from '../types';
import {
  ArrowButton,
  Cell,
  Container,
  Header,
  PrimaryHeader,
  Row,
  StatusWrapper,
  Swipeable,
  SwipeControls,
  Swiper,
} from './MobileTable.styles';

interface MobileTableProps<T> {
  columns: readonly Column<T>[];
  rows: readonly T[];
  getRowId: (row: T) => string;
  getRowHref: (row: T) => string;
  status: string | null;
  statusNode: ReactNode;
  sortBy: string;
  sortOrder: SortOrder;
  onSortChange: (columnKey: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const MobileTable = <T,>({
  columns,
  rows,
  getRowId,
  getRowHref,
  status,
  statusNode,
  sortBy,
  sortOrder,
  onSortChange,
  filters,
  onFiltersChange,
}: MobileTableProps<T>) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(1);
  const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);

  const secondaryCount = Math.max(1, columns.length - 1);
  const step = (delta: number) =>
    setActiveIndex(
      (prev) => ((prev - 1 + delta + secondaryCount) % secondaryCount) + 1
    );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => step(1),
    onSwipedRight: () => step(-1),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const primaryColumn = columns[0];
  const activeColumn = columns[activeIndex] ?? columns[secondaryCount];
  if (!primaryColumn || !activeColumn) return null;

  return (
    <Container>
      <Header>
        <PrimaryHeader
          type="button"
          onClick={() => onSortChange(primaryColumn.key)}
        >
          {t(primaryColumn.titleKey)}
          {sortBy === primaryColumn.key &&
            (sortOrder === 'asc' ? (
              <Icons.sortASC width={20} height={20} aria-hidden />
            ) : (
              <Icons.sortDESC width={20} height={20} aria-hidden />
            ))}
        </PrimaryHeader>

        <Swiper>
          <TableHeaderCell
            column={activeColumn}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
            filters={filters}
            onFiltersChange={onFiltersChange}
            isFilterOpen={openFilterKey === activeColumn.key}
            onFilterToggle={setOpenFilterKey}
          />
        </Swiper>
      </Header>

      <SwipeControls>
        <ArrowButton
          type="button"
          aria-label={t('shared.previousColumn')}
          onClick={() => step(-1)}
        >
          <Icons.arrowLeft aria-hidden />
        </ArrowButton>
        <ArrowButton
          type="button"
          aria-label={t('shared.nextColumn')}
          onClick={() => step(1)}
        >
          <Icons.arrowRight aria-hidden />
        </ArrowButton>
      </SwipeControls>

      <Swipeable {...swipeHandlers}>
        {status ? (
          <StatusWrapper>{statusNode}</StatusWrapper>
        ) : (
          rows.map((row) => (
            <Row key={getRowId(row)}>
              <Cell className={hoverEffect}>
                <Link to={getRowHref(row)} className="block truncate">
                  {primaryColumn.renderCell(row)}
                </Link>
              </Cell>
              <Cell className="flex items-center justify-end">
                {activeColumn.renderCell(row)}
              </Cell>
            </Row>
          ))
        )}
      </Swipeable>
    </Container>
  );
};
