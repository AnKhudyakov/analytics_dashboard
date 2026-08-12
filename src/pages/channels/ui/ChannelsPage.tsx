import { useTranslation } from 'react-i18next';

import {
  type Channel,
  channelColumns,
  CHANNELS_DEFAULT_SORT,
  useGetChannelsQuery,
} from 'entities/channel';
import { routerPaths } from 'shared/constants';
import { useTableParams } from 'shared/lib/hooks';
import { ResourceTable } from 'widgets/resource-table';

export const ChannelsPage = () => {
  const { t } = useTranslation();
  const table = useTableParams({ defaultSortBy: CHANNELS_DEFAULT_SORT });
  const { data, isFetching, isError, refetch } = useGetChannelsQuery(
    table.params
  );

  return (
    <ResourceTable<Channel>
      title={t('channels.title')}
      emptyText={t('channels.empty')}
      columns={channelColumns}
      rows={data?.items ?? []}
      total={data?.pageInfo.totalResults ?? 0}
      isLoading={isFetching}
      isError={isError}
      onRetry={() => void refetch()}
      getRowId={(channel) => channel.id}
      getRowHref={(channel) => `${routerPaths.CHANNELS}/${channel.id}`}
      table={table}
    />
  );
};
