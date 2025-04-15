import { FC } from 'react';
import { Error } from 'shared/ui/components/Error';
import { Loader } from 'shared/ui/components/Loader';
import { EmptyList } from '../EmptyList';
import { ListItem } from '../ListItem';
import { ListBodyProps } from './ListBody.def';
import { RowWrapper } from './RowWrapper';

export const ListBody: FC<ListBodyProps> = ({
  isLoading,
  error,
  onError,
  data,
  viewPath,
  emptyText,
}) => {
  const colSpan = data.items.length;

  if (isLoading) {
    return (
      <RowWrapper colSpan={colSpan}>
        <Loader />
      </RowWrapper>
    );
  }

  if (error) {
    return (
      <RowWrapper colSpan={colSpan}>
        <Error
          text="Error data loading"
          onError={onError}
          disabled={isLoading}
        />
      </RowWrapper>
    );
  }

  if (!data.count) {
    return (
      <RowWrapper colSpan={colSpan}>
        <EmptyList text={emptyText} />
      </RowWrapper>
    );
  }

  return (
    <>
      {Array.from({ length: data.count }).map((_, rowIndex) => (
        <ListItem
          key={rowIndex}
          items={data.items}
          path={`${viewPath}/${data.ids[rowIndex]}`}
          rowIndex={rowIndex}
        />
      ))}
    </>
  );
};
