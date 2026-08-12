import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ROWS_PER_PAGE_OPTIONS } from 'shared/lib/hooks';
import { hoverEffect } from 'shared/ui/effects';
import { Icons } from 'shared/ui/icons';

import {
  ArrowButton,
  Label,
  PaginationContainer,
  PaginationControls,
  PaginationInfo,
  RowsPerPageSelect,
} from './Pagination.styles';

export interface PaginationProps {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const { t } = useTranslation();

  const lastPage = Math.max(1, Math.ceil(total / rowsPerPage));
  const currentPage = Math.min(page, lastPage);
  const firstItem = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const lastItem = Math.min(currentPage * rowsPerPage, total);

  return (
    <PaginationContainer>
      <PaginationInfo aria-live="polite">
        {firstItem} - {lastItem} {t('shared.of')} {total}
      </PaginationInfo>
      <PaginationControls>
        <div className="mr-2 sm:mr-4">
          <Label htmlFor="rows-per-page">{t('shared.perpage')}</Label>
          <RowsPerPageSelect
            id="rows-per-page"
            className={hoverEffect}
            value={rowsPerPage}
            onChange={(event) =>
              onRowsPerPageChange(Number(event.target.value))
            }
          >
            {ROWS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </RowsPerPageSelect>
        </div>
        <div className="flex items-center gap-2">
          <ArrowButton
            type="button"
            aria-label={t('shared.previousPage')}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={hoverEffect}
          >
            <Icons.arrowLeft aria-hidden />
          </ArrowButton>
          <ArrowButton
            type="button"
            aria-label={t('shared.nextPage')}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= lastPage}
            className={hoverEffect}
          >
            <Icons.arrowRight aria-hidden />
          </ArrowButton>
        </div>
      </PaginationControls>
    </PaginationContainer>
  );
};
