import { Dispatch, SetStateAction } from 'react';

export interface PaginationProps {
  count?: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}
