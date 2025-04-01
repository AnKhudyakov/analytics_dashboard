import { Icons } from 'shared/ui/icons';
import { PaginationProps } from './Pagination.def';
import {
  ArrowButton,
  PaginationContainer,
  PaginationControls,
  PaginationInfo,
  RowsPerPageSelect,
} from './Pagination.styles';
import { useEffect, useState } from 'react';

export const Pagination: React.FC<PaginationProps> = ({
  count,
  next,
  prev,
  setPageToken,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, count);

  const handlePrevClick = () => {
    if (prev) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      setPageToken(prev);
    }
  };

  const handleNextClick = () => {
    if (next) {
      setCurrentPage((prev) => prev + 1);
      setPageToken(next);
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
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </RowsPerPageSelect>
        </div>
        <div className="flex items-center space-x-2">
          <ArrowButton onClick={handlePrevClick} disabled={!prev}>
            <Icons.arrowLeft width={14} height={14}/>
          </ArrowButton>
          <ArrowButton onClick={handleNextClick} disabled={!next}>
          <Icons.arrowRight width={14} height={14}/>
          </ArrowButton>
        </div>
      </PaginationControls>
    </PaginationContainer>
  );
};
