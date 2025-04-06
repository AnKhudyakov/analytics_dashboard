import {
  useGetTrendingVideosQuery,
  useSearchVideosQuery,
} from 'entities/video';
import { videos } from 'pages/Videos/Video.mother';
import { useState } from 'react';
import { useDebounce } from 'shared/lib/hooks/useDebounce';

export const useVideosData = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useGetTrendingVideosQuery(
    {
      page,
      limit: rowsPerPage ,
    },
    //{ skip: Boolean(videos) }
  );

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchVideosQuery(debouncedSearch, {
    skip: debouncedSearch.length < 10 || Boolean(videos),
  });

  const filteredData = searchData || data || videos;

  return {
    filteredData,
    isLoading: isLoading || isSearching,
    error: error || searchError,
    setSearch,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  };
};
