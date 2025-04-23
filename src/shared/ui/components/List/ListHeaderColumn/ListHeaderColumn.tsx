import { FC } from 'react';
import { Button } from 'shared/ui/components/Button';
import { Icons } from 'shared/ui/icons';
import { ListItem } from '../ListItem/ListItem.def';
import {
  FilterIcon,
  HeaderContent,
  HeaderTitle,
} from './ListHeaderColumn.styles';

interface ListHeaderColumnProps {
  col: ListItem;
  onSetFilter: () => void;
  hasFilter: boolean;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc';
  onSort: () => void;
}

export const ListHeaderColumn: FC<ListHeaderColumnProps> = ({
  col,
  onSetFilter,
  hasFilter,
  sortBy,
  sortOrder,
  onSort,
}) => {
  return (
    <HeaderContent>
      {col.filterType && (
        <Button icon onClick={onSetFilter}>
          <FilterIcon width={24} height={24} hasFilter={hasFilter} />
        </Button>
      )}
      <HeaderTitle onClick={onSort}>{col.title}</HeaderTitle>
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
  );
};
