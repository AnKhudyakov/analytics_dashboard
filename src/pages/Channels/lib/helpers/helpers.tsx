import { Channel, ColumnChannel } from 'entities/channel/model/types';
import { config } from 'shared/config';
import { formatStatistic } from 'shared/lib/helpers/helpers';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';

export const formatChannels = (data: Channel[] | undefined) => ({
  count: data?.length || 0,
  ids: data?.map((el) => el.id) || [],
  items: Object.entries(ColumnChannel).map(([key, title]) => ({
    title,
    key: key as keyof typeof ColumnChannel,
    values:
      key === 'name'
        ? data?.map((el) => (
            <AvatarInfo
              key={el.id}
              src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(el.snippet.thumbnails.default.url)}`}
              alt={el.snippet.title}
              name={el.snippet.title}
            />
          )) || []
        : formatStatistic(data, key as keyof Channel['statistics']),
  })),
});
