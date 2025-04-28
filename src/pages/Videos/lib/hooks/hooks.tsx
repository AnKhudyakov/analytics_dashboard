import {
  useGetTrendingVideosQuery,
  useSearchVideosQuery,
} from 'entities/video';
import { ColumnVideo } from 'entities/video/model/types';
import { useState } from 'react';
import { Filters } from 'shared/api/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce';

export const useVideosData = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof typeof ColumnVideo>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Filters>({});

  const debouncedSearch = useDebounce(search, 1000);

  const {
    data: searchData,
    isLoading: isSearching,
    isFetching: isFetchingSearch,
    error: searchError,
    refetch: research,
  } = useSearchVideosQuery(
    {
      search: debouncedSearch,
      page,
      limit: rowsPerPage,
      sortBy,
      sortOrder,
      filters,
    },
    {
      skip: debouncedSearch.length < 1,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data, isLoading, isFetching, error, refetch } =
    useGetTrendingVideosQuery(
      {
        page,
        limit: rowsPerPage,
        sortBy,
        sortOrder,
        filters,
      },
      {
        skip: search.length > 1,
        refetchOnMountOrArgChange: true,
      }
    );

  const filteredData = debouncedSearch ? searchData : data;

  return {
    filteredData,
    isLoading: isLoading || isSearching || isFetchingSearch || isFetching,
    error: error || searchError,
    search,
    setSearch,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    filters,
    setFilters,
    refetch: search ? research : refetch,
  };
};
