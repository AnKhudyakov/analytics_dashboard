import { EmptyList } from 'shared/ui/components/EmptyList';
import { Error } from 'shared/ui/components/Error';
import { List } from 'shared/ui/components/List';
import { Loader } from 'shared/ui/components/Loader';
import { Pagination } from 'shared/ui/components/Pagination';
import { ChannelsContent, Container } from './ChannelsPage.styles';
import { formatChannels } from './lib/helpers';
import { useChannelsData } from './lib/hooks';
import { ChannelsHeader } from './ui/ChannelsHeader';

export const ChannelsPage = () => {
  const {
    statsData,
    isLoading,
    error,
    search,
    setSearch,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  } = useChannelsData();

  if (isLoading) return <Loader />;

  return (
    <Container>
      <ChannelsHeader
        content="Top 50 Channels"
        search={search}
        setSearch={setSearch}
      />
      {error || !statsData ? (
        <Error text="Error data loading" />
      ) : (
        <ChannelsContent>
          <List
            data={formatChannels(statsData.items)}
            empty={<EmptyList text="No channels found" />}
            viewPath="/channels"
          />
          <Pagination
            count={statsData.pageInfo.totalResults}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </ChannelsContent>
      )}
    </Container>
  );
};
