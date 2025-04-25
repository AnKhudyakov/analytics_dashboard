import { ColumnChannel } from 'entities/channel/model/types';
import { useTranslation } from 'react-i18next';
import { List } from 'shared/ui/components/List';
import { PageHeader } from 'shared/ui/components/PageHeader';
import { Pagination } from 'shared/ui/components/Pagination';
import { ChannelsContent, Container } from './ChannelsPage.styles';
import { formatChannels } from './lib/helpers';
import { useChannelsData } from './lib/hooks';

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

  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader
        content={t('channels.title')}
        search={search}
        setSearch={setSearch}
      />
      <ChannelsContent>
        <List
          data={formatChannels(statsData?.items)}
          isLoading={isLoading}
          error={!!error}
          onError={() => refetch()}
          emptyText={t('channels.empty')}
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
