import { ColumnVideo } from 'entities/video/model/types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
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
    refetch,
  } = useVideosData();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchFromParams = searchParams.get('search') || '';
    if (searchFromParams) {
      setSearch(searchFromParams);
      setSearchParams("")
    }
  }, []);

  const { t } = useTranslation();

  return (
    <Container>
      <PageHeader
        content={t('videos.title')}
        search={search}
        setSearch={setSearch}
      />
      <ChannelsContent>
        <List
          data={formatVideos(filteredData?.items)}
          isLoading={isLoading}
          error={!!error}
          onError={() => refetch()}
          emptyText={t('videos.empty')}
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
    </Container>
  );
};
