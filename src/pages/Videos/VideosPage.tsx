import { ColumnVideo } from 'entities/video/model/types';
import { Error } from 'shared/ui/components/Error';
import { List } from 'shared/ui/components/List';
import { PageHeader } from 'shared/ui/components/PageHeader';
import { Pagination } from 'shared/ui/components/Pagination';
import { ChannelsContent, Container } from './VideosPage.styles';
import { formatVideos } from './lib/helpers';
import { useVideosData } from './lib/hooks';

export const VideosPage = () => {
  const {
    filteredData,
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
  } = useVideosData();

  return (
    <Container>
      <PageHeader
        content="Top 50 Videos"
        search={search}
        setSearch={setSearch}
      />
      {error ? (
        <Error text="Error data loading" />
      ) : (
        <ChannelsContent>
          <List
            data={formatVideos(filteredData?.items)}
            isLoading={isLoading}
            emptyText="No videos found"
            viewPath="/videos"
            onSort={(column) => {
              if (column === sortBy) {
                setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
              } else {
                setSortBy(column as keyof typeof ColumnVideo);
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
            count={filteredData?.pageInfo?.totalResults}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </ChannelsContent>
      )}
    </Container>
  );
};
