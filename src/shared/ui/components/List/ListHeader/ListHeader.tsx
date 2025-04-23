import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { createFilters } from 'shared/lib/helpers';
import { FilterPopup } from 'shared/ui/components/FilterPopup';
import { ListHeaderColumn } from '../ListHeaderColumn/ListHeaderColumn';
import { ListHeaderProps } from './ListHeader.def';
import { HeaderRow, TableHeader } from './ListHeader.styles';

export const ListHeader: FC<ListHeaderProps> = ({
  cols,
  onSort,
  sortBy,
  sortOrder,
  filters,
  onFilter,
}) => {
  const filterRef = useRef<HTMLButtonElement | null>(null);

  const initialFilters = useMemo(() => createFilters(cols), [cols]);

  const [openFilters, setOpenFilters] = useState(initialFilters);

  const handleSetFilter = useCallback(
    (key: string, status: boolean) =>
      setOpenFilters({ ...initialFilters, [key]: status }),
    [initialFilters]
  );

  return (
    <HeaderRow>
      {cols.map((col, index) => (
        <TableHeader
          key={col.title}
          ref={filterRef}
          className={index === 0 ? 'w-1/4' : 'w-1/5'}
        >
          <ListHeaderColumn
            col={col}
            onSetFilter={() => handleSetFilter(col.key, true)}
            hasFilter={!!filters?.[col.key]}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={() => onSort?.(col.key)}
          />
          <FilterPopup
            open={openFilters[col.key]}
            type={col.filterType}
            filterKey={col.key}
            filters={filters}
            onFilter={onFilter}
            onClose={handleSetFilter.bind(this, col.key, false)}
          />
        </TableHeader>
      ))}
    </HeaderRow>
  );
};
