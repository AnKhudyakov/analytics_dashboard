import { FC, useEffect, useState } from 'react';
import { hoverEffect } from 'shared/ui/effects';
import { Icons } from 'shared/ui/icons';
import { PaginationProps } from './Pagination.def';
import {
  ArrowButton,
  PaginationContainer,
  PaginationControls,
  PaginationInfo,
  RowsPerPageSelect,
} from './Pagination.styles';

export const Pagination: FC<PaginationProps> = ({
  count = 0,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, count);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      setPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(count / rowsPerPage)) {
      setCurrentPage((prev) => prev + 1);
      setPage((prev) => prev + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  return (
    <PaginationContainer>
      <PaginationInfo>
        {startIndex} - {endIndex} of {count}
      </PaginationInfo>
      <PaginationControls>
        <div>
          <label htmlFor="rows-per-page" className="text-sm mr-2">
            Rows per page:
          </label>
          <RowsPerPageSelect
            id="rows-per-page"
            className={hoverEffect}
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </RowsPerPageSelect>
        </div>
        <div className="flex items-center gap-2">
          <ArrowButton
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={hoverEffect}
          >
            <Icons.arrowLeft width={14} height={14}/>
          </ArrowButton>
          <ArrowButton
            onClick={handleNextClick}
            disabled={currentPage === Math.ceil(count / rowsPerPage)}
            className={hoverEffect}
          >
            <Icons.arrowRight width={14} height={14}/>
          </ArrowButton>
        </div>
      </PaginationControls>
    </PaginationContainer>
  );
};
