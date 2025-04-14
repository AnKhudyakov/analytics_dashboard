import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { createFilters } from 'shared/lib/helpers';
import { Button } from 'shared/ui/components/Button';
import { FilterPopup } from 'shared/ui/components/FilterPopup';
import { Loader } from 'shared/ui/components/Loader';
import { Icons } from 'shared/ui/icons';
import { EmptyList } from './EmptyList';
import { ListProps } from './List.def';
import {
  FilterIcon,
  HeaderContent,
  HeaderTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from './List.styles';
import { ListItem } from './ListItem';

export const List: FC<ListProps> = ({
  data,
  isLoading,
  emptyText,
  viewPath,
  onSort,
  sortBy,
  sortOrder,
  filters,
  onFilter,
}) => {
  const initFilters = useMemo(() => createFilters(data.items), [data.items]);

  const [openFilters, setOpenFilters] = useState(initFilters);
  const filterRef = useRef<HTMLButtonElement | null>(null);

  const handleSetFilter = useCallback(
    (key: string, status: boolean) =>
      setOpenFilters({ ...initFilters, [key]: status }),
    [initFilters]
  );

  return (
    <TableContainer>
      <Table $loading={isLoading}>
        <TableHead>
          <TableRow>
            {data.items.map((col, index) => (
              <TableHeader
                key={col.title}
                ref={filterRef}
                className={index === 0 ? 'w-1/4' : 'w-1/5'}
              >
                <HeaderContent>
                  {col.filterType && (
                    <Button
                      icon
                      onClick={handleSetFilter.bind(this, col.key, true)}
                    >
                      <FilterIcon
                        width={24}
                        height={24}
                        hasFilter={!!filters[col.key]}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow className="text-center">
              <TableCell colSpan={data.items.length} className="text-center">
                <Loader />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.count ? (
                Array.from({ length: data.count }).map((_, rowIndex) => (
                  <ListItem
                    key={rowIndex}
                    items={data.items}
                    path={`${viewPath}/${data.ids[rowIndex]}`}
                    rowIndex={rowIndex}
                  />
                ))
              ) : (
                <TableRow className="text-center">
                  <TableCell
                    colSpan={data.items.length}
                    className="text-center"
                  >
                    <EmptyList text={emptyText} />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
