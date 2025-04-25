import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filters } from 'shared/api/types';
import { Error } from 'shared/ui/components/Error';
import { Loader } from 'shared/ui/components/Loader';
import { hoverEffect } from 'shared/ui/effects';
import { EmptyList } from '../../EmptyList';
import { ListItem } from '../../ListItem/ListItem.def';
import { Cell, Row, Wrapper } from './MobileListBody.styles';
import { useTranslation } from 'react-i18next';

interface MobileListBodyProps {
  isLoading: boolean;
  error: boolean;
  onError?: () => void;
  activeIndex: number;
  data: { items: ListItem[]; count: number; ids: string[] };
  viewPath: string;
  emptyText?: string;
  onFilter: (updatedFilters: Filters) => void;
}

export const MobileListBody: FC<MobileListBodyProps> = ({
  isLoading,
  error,
  onError,
  activeIndex,
  data,
  viewPath,
  emptyText,
  onFilter,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cols = data.items;

  if (isLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <Error text={t('shared.errorLoading')} onError={onError} />
      </Wrapper>
    );
  }

  if (!data.count) {
    return (
      <Wrapper>
        <EmptyList text={emptyText} onClear={() => onFilter({})} />
      </Wrapper>
    );
  }

  return (
    <>
      {Array.from({ length: data.count }).map((_, rowIndex) => (
        <Row key={rowIndex}>
          <Cell
            className={hoverEffect}
            onClick={() => navigate(`${viewPath}/${data.ids[rowIndex]}`)}
          >
            {cols[0].values[rowIndex]}
          </Cell>
          <Cell className="flex justify-end items-center">
            {cols[activeIndex].values[rowIndex]}
          </Cell>
        </Row>
      ))}
    </>
  );
};
