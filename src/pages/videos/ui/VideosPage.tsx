import { useTranslation } from 'react-i18next';

import {
  useGetVideosQuery,
  type Video,
  videoColumns,
  VIDEOS_DEFAULT_SORT,
} from 'entities/video';
import { routerPaths } from 'shared/constants';
import { useTableParams } from 'shared/lib/hooks';
import { ResourceTable } from 'widgets/resource-table';

export const VideosPage = () => {
  const { t } = useTranslation();
  const table = useTableParams({ defaultSortBy: VIDEOS_DEFAULT_SORT });
  const { data, isFetching, isError, refetch } = useGetVideosQuery(
    table.params
  );

  return (
    <ResourceTable<Video>
      title={t('videos.title')}
      emptyText={t('videos.empty')}
      columns={videoColumns}
      rows={data?.items ?? []}
      total={data?.pageInfo.totalResults ?? 0}
      isLoading={isFetching}
      isError={isError}
      onRetry={() => void refetch()}
      getRowId={(video) => video.id}
      getRowHref={(video) => `${routerPaths.VIDEOS}/${video.id}`}
      table={table}
    />
  );
};
