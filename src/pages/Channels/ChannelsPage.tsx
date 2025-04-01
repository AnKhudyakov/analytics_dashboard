import {
  useGetChannelsStatsQuery,
  useSearchChannelsQuery,
} from 'entities/channel';
import { useGetTrendingVideosQuery } from 'entities/video';
import { useState } from 'react';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { EmptyList } from 'shared/ui/components/EmptyList';
import { List } from 'shared/ui/components/List';
import { Pagination } from 'shared/ui/components/Pagination';
import {
  ChannelsContent,
  Container,
  ErrorText,
  LoadingText,
} from './ChannelsPage.styles';
import { formatChannels } from './lib/helpers';
import { ChannelsHeader } from './ui/ChannelsHeader';

export const ChannelsPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageToken, setPageToken] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useGetTrendingVideosQuery({
    pageToken,
    rowsPerPage,
  });

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchChannelsQuery(debouncedSearch, {
    skip: debouncedSearch.length < 10,
  });

  const filteredData = searchData || data;
  const channelIds = [
    ...new Set(filteredData?.items.map((ch) => ch.snippet.channelId)),
  ].join(',');

  const { data: statsData, isLoading: isLoadingStats } =
    useGetChannelsStatsQuery(channelIds, {
      skip: !channelIds,
    });

  return (
    <Container>
      <ChannelsHeader content="Channels" setSearch={setSearch} />
      {isLoading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>Error data loading</ErrorText>}
      {statsData && (
        <ChannelsContent>
          <List
            data={formatChannels(statsData.items)}
            empty={<EmptyList text="No channels find" />}
          />
          <Pagination
            count={statsData.pageInfo.totalResults}
            prev={statsData.prevPageToken}
            next={statsData.nextPageToken}
            setPageToken={setPageToken}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </ChannelsContent>
      )}
    </Container>
  );
};
