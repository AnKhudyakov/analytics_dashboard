import { useGetChannelsQuery, useSearchChannelsQuery } from 'entities/channel';
import { useState } from 'react';
import { useDebounce } from 'shared/lib/hooks/useDebounce';

export const useChannelsData = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  //const [pageToken, setPageToken] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // const { data, isLoading, error } = useGetTrendingVideosQuery(
  //   {
  //     pageToken,
  //     rowsPerPage,
  //   },
  //   { skip: Boolean(channels) }
  // );

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchChannelsQuery(debouncedSearch, {
    skip: debouncedSearch.length < 10, //|| Boolean(channels),
  });

  //const filteredData = searchData || data;
  // const channelIds = [
  //   ...new Set(filteredData?.items.map((ch) => ch.snippet.channelId)),
  // ].join(',');

  const {
    data: statsData,
    isLoading: isLoadingStats,
    error,
  } = useGetChannelsQuery({ page, limit: rowsPerPage });
  //channelIds, {
  //skip: !channelIds //|| Boolean(channels),
  // });

  return {
    statsData: searchData || statsData, //||  channels,
    isLoading: isSearching || isLoadingStats,
    error: error || searchError,
    setSearch,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  };
};
