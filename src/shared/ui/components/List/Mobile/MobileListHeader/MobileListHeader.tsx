import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { createFilters } from 'shared/lib/helpers';
import { FilterPopup } from 'shared/ui/components/FilterPopup';
import { Icons } from 'shared/ui/icons';
import { ListHeaderColumn } from '../../ListHeaderColumn/ListHeaderColumn';
import { MobileListHeaderProps } from './MobileListHeader.def';
import {
  ArrowButton,
  Header,
  SwipeControls,
  Swiper,
} from './MobileListHeader.styles';

export const MobileListHeader: FC<MobileListHeaderProps> = ({
  activeIndex,
  setActiveIndex,
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

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const next = prev - 1;
      return next <= 0 ? cols.length - 1 : next; // skip 1 column
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % cols.length;
      return next === 0 ? 1 : next; // skip 1 column
    });
  };

  const col = cols[activeIndex];

  return (
    <>
      <Header>
        <div className="w-1/2 flex gap-2" onClick={() => onSort?.(cols[0].key)}>
          {cols[0].title}
          {sortBy === cols[0].key && (
            <>
              {sortOrder === 'asc' ? (
                <Icons.sortASC width={20} height={20} />
              ) : (
                <Icons.sortDESC width={20} height={20} />
              )}
            </>
          )}
        </div>

        <Swiper ref={filterRef}>
          <ListHeaderColumn
            col={col}
            onSetFilter={handleSetFilter.bind(this, col.key, true)}
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
        </Swiper>
      </Header>
      <SwipeControls>
        <ArrowButton onClick={handlePrev}>
          <Icons.arrowLeft width={15} height={15} />
        </ArrowButton>
        <ArrowButton onClick={handleNext}>
          <Icons.arrowRight width={15} height={15} />
        </ArrowButton>
      </SwipeControls>
    </>
  );
};
