import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'shared/ui/Button';
import { Error } from 'shared/ui/Error';
import { Loader } from 'shared/ui/Loader';
import { Typography } from 'shared/ui/Typography';

import { EmptyContainer } from './TableStatus.styles';

export type TableStatusKind = 'loading' | 'error' | 'empty';

interface TableStatusProps {
  kind: TableStatusKind;
  emptyText: string;
  onRetry: () => void;
  onClearFilters: () => void;
  canClearFilters: boolean;
}

export const TableStatus: FC<TableStatusProps> = ({
  kind,
  emptyText,
  onRetry,
  onClearFilters,
  canClearFilters,
}) => {
  const { t } = useTranslation();

  if (kind === 'loading') return <Loader />;
  if (kind === 'error') {
    return <Error text={t('shared.errorLoading')} onRetry={onRetry} />;
  }

  return (
    <EmptyContainer>
      <Typography variant="subtitle">{emptyText}</Typography>
      {canClearFilters && (
        <Button onClick={onClearFilters}>{t('shared.clearAll')}</Button>
      )}
    </EmptyContainer>
  );
};
