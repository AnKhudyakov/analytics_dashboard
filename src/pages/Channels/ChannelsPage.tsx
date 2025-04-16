import { ColumnChannel } from 'entities/channel/model/types';
import { List } from 'shared/ui/components/List';
import { Pagination } from 'shared/ui/components/Pagination';
import { ChannelsContent, Container } from './ChannelsPage.styles';
import { formatChannels } from './lib/helpers';
import { useChannelsData } from './lib/hooks';
import { PageHeader } from 'shared/ui/components/PageHeader';

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
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filters,
    setFilters,
    refetch,
  } = useChannelsData();

  return (
    <Container>
      <PageHeader
        content="Top 50 Channels"
        search={search}
        setSearch={setSearch}
      />
      <ChannelsContent>
        <List
          data={formatChannels(statsData?.items)}
          isLoading={isLoading}
          error={!!error}
          onError={() => refetch()}
          emptyText="No channels found"
          viewPath="/channels"
          onSort={(column) => {
            if (column === sortBy) {
              setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            } else {
              setSortBy(column as keyof typeof ColumnChannel);
              setSortOrder('asc');
            }
          }}
          sortBy={sortBy}
          sortOrder={sortOrder}
          filters={filters}
          onFilter={(newFilters) => {
            setFilters(newFilters);
          }}
        />
        <Pagination
          count={statsData?.pageInfo?.totalResults}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </ChannelsContent>
    </Container>
  );
};
