import { FC } from 'react';
import { ListProps } from './List.def';
import { Table, TableBody, TableContainer, TableHead } from './List.styles';
import { ListBody } from './ListBody';
import { ListHeader } from './ListHeader';

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
      <Table $loading={isLoading || error}>
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
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
