import { ColumnVideo } from 'entities/video/model/types';
import { EmptyList } from 'shared/ui/components/EmptyList';
import { Error } from 'shared/ui/components/Error';
import { List } from 'shared/ui/components/List';
import { Loader } from 'shared/ui/components/Loader';
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
  } = useVideosData();

  return (
    <Container>
      <PageHeader
        content="Top 50 Videos"
        search={search}
        setSearch={setSearch}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? (
            <Error text="Error data loading" />
          ) : (
            <ChannelsContent>
              <List
                data={formatVideos(filteredData?.items)}
                empty={<EmptyList text="No videos found" />}
                viewPath={'/videos'}
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
              />
              <Pagination
                count={filteredData?.pageInfo?.totalResults}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </ChannelsContent>
          )}
        </>
      )}
    </Container>
  );
};
