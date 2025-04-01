import { useState } from 'react';
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
import { useGetTrendingVideosQuery } from 'entities/channel/model/api';

export const ChannelsPage = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageToken, setPageToken] = useState('');
  const { data, isLoading, error } = useGetTrendingVideosQuery({
    pageToken,
    rowsPerPage,
  });

  return (
    <Container>
      <ChannelsHeader content="Channels" />
      {isLoading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>Error data loading</ErrorText>}
      {data && (
        <ChannelsContent>
          <List
            data={formatChannels(data.items)}
            empty={<EmptyList text="No channels find" />}
          />
          <Pagination
            count={data.pageInfo.totalResults}
            prev={data.prevPageToken}
            next={data.nextPageToken}
            setPageToken={setPageToken}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </ChannelsContent>
      )}
    </Container>
  );
};
