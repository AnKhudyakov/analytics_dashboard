import {
  useGetTrendingVideosQuery,
  useSearchVideosQuery,
} from 'entities/video';
import { ColumnVideo } from 'entities/video/model/types';
import { useState } from 'react';
import { useDebounce } from 'shared/lib/hooks/useDebounce';

export const useVideosData = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof typeof ColumnVideo>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const debouncedSearch = useDebounce(search, 1000);

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchVideosQuery(
    { search: debouncedSearch, page, limit: rowsPerPage, sortBy, sortOrder },
    {
      skip: debouncedSearch.length < 1,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data, isLoading, error } = useGetTrendingVideosQuery(
    {
      page,
      limit: rowsPerPage,
      sortBy,
      sortOrder,
    },
    {
      skip: search.length > 1,
      refetchOnMountOrArgChange: true,
    }
  );

  const filteredData = searchData ? searchData : data;

  return {
    filteredData,
    isLoading: isLoading || isSearching,
    error: error || searchError,
    setSearch,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
  };
};
