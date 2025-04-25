import { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
  onFilter,
  hasFilters,
}) => {
  const { t } = useTranslation();
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
          text={t('shared.errorLoading')}
          onError={onError}
          disabled={isLoading}
        />
      </RowWrapper>
    );
  }

  if (!data.count) {
    return (
      <RowWrapper colSpan={colSpan}>
        <EmptyList
          text={emptyText}
          onClear={() => onFilter({})}
          disabled={!hasFilters}
        />
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
