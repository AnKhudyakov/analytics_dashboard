import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { createFilters } from 'shared/lib/helpers';
import { Button } from 'shared/ui/components/Button';
import { FilterPopup } from 'shared/ui/components/FilterPopup';
import { Icons } from 'shared/ui/icons';
import { ListHeaderProps } from './ListHeader.def';
import {
  FilterIcon,
  HeaderContent,
  HeaderRow,
  HeaderTitle,
  TableHeader,
} from './ListHeader.styles';

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
          <HeaderContent>
            {col.filterType && (
              <Button icon onClick={handleSetFilter.bind(this, col.key, true)}>
                <FilterIcon
                  width={24}
                  height={24}
                  hasFilter={!!filters?.[col.key]}
                />
              </Button>
            )}
            <HeaderTitle onClick={() => onSort?.(col.key)}>
              {col.title}
            </HeaderTitle>
            {sortBy === col.key && (
              <>
                {sortOrder === 'asc' ? (
                  <Icons.sortASC width={20} height={20} />
                ) : (
                  <Icons.sortDESC width={20} height={20} />
                )}
              </>
            )}
          </HeaderContent>
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
