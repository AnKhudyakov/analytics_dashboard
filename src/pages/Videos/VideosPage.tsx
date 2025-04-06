import { EmptyList } from 'shared/ui/components/EmptyList';
import { List } from 'shared/ui/components/List';
import { Pagination } from 'shared/ui/components/Pagination';
import {
  ChannelsContent,
  Container,
  ErrorText,
  LoadingText,
} from './VideosPage.styles';
import { formatVideos } from './lib/helpers';
import { useVideosData } from './lib/hooks';
import { PageHeader } from 'shared/ui/components/PageHeader';

export const VideosPage = () => {
  const {
    filteredData,
    isLoading,
    error,
    setSearch,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  } = useVideosData();

  return (
    <Container>
      <PageHeader content="Videos" setSearch={setSearch} />
      {isLoading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>Error data loading</ErrorText>}
      {filteredData && (
        <ChannelsContent>
          <List
            data={formatVideos(filteredData.items)}
            empty={<EmptyList text="No videos found" />}
            viewPath={"/videos"}
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
