import { Dispatch, SetStateAction } from 'react';

export interface PaginationProps {
  count: number;
  next?: string;
  prev?: string;
  setPageToken: Dispatch<SetStateAction<string>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}
