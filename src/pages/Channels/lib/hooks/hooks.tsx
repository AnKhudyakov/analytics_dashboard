import { useGetChannelsQuery, useSearchChannelsQuery } from 'entities/channel';
import { ColumnChannel } from 'entities/channel/model/types';
import { useState } from 'react';
import { Filters } from 'shared/api/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce';

export const useChannelsData = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof typeof ColumnChannel>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Filters>({});

  const debouncedSearch = useDebounce(search, 1000);

  const {
    data: searchData,
    isLoading: isSearching,
    isFetching: isFetchingSearch,
    error: searchError,
    refetch: research,
  } = useSearchChannelsQuery(
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

  const { data, isLoading, isFetching, error, refetch } = useGetChannelsQuery(
    { page, limit: rowsPerPage, sortBy, sortOrder, filters },
    {
      skip: search.length > 1,
      refetchOnMountOrArgChange: true,
    }
  );

  const filteredData = search ? searchData : data;

  return {
    statsData: filteredData,
    isLoading: isSearching || isLoading || isFetchingSearch || isFetching,
    error: error || searchError,
    search,
    setSearch,
    page,
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
