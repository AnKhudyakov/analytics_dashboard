import { FC } from 'react';
import { ListProps } from './List.def';
import { Table, TableBody, TableContainer, TableHead } from './List.styles';
import { ListBody } from './ListBody';
import { ListHeader } from './ListHeader';
import { MobileList } from './Mobile';

export const List: FC<ListProps> = ({
  data,
  isLoading,
  error,
  onError,
  emptyText,
  viewPath,
  ...props
}) => {
  return (
    <TableContainer>
      {/* Desktop */}
      <Table $loading={isLoading || error || !data.count}>
        <TableHead>
          <ListHeader cols={data.items} {...props} />
        </TableHead>
        <TableBody>
          <ListBody
            isLoading={isLoading}
            error={error}
            onError={onError}
            data={data}
            emptyText={emptyText}
            viewPath={viewPath}
            onFilter={props.onFilter}
          />
        </TableBody>
      </Table>
      {/* Mobile */}
        <MobileList
          isLoading={isLoading}
          error={error}
          onError={onError}
          data={data}
          emptyText={emptyText}
          viewPath={viewPath}
          {...props}
        />
    </TableContainer>
  );
};
