import { EmptyList } from 'shared/ui/components/EmptyList';
import { Error } from 'shared/ui/components/Error';
import { List } from 'shared/ui/components/List';
import { Loader } from 'shared/ui/components/Loader';
import { PageHeader } from 'shared/ui/components/PageHeader';
import { Pagination } from 'shared/ui/components/Pagination';
import {
  ChannelsContent,
  Container,
  ErrorText,
  LoadingText,
} from './VideosPage.styles';
import { formatVideos } from './lib/helpers';
import { useVideosData } from './lib/hooks';
import { ColumnVideo } from 'entities/video/model/types';

export const VideosPage = () => {
  const {
    filteredData,
    isLoading,
    error,
    setSearch,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  } = useVideosData();

  if (isLoading) return <Loader />;

  return (
    <Container>
      <PageHeader content="Videos" setSearch={setSearch} />
      {isLoading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>Error data loading</ErrorText>}
      {error || !filteredData ? (
        <Error text="Error data loading" />
      ) : (
        <ChannelsContent>
          <List
            data={formatVideos(filteredData.items)}
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
            count={filteredData.pageInfo.totalResults}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </ChannelsContent>
      )}
    </Container>
  );
};
