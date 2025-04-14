import { Video } from 'entities/video';
import { ColumnVideo } from 'entities/video/model/types';
import { Filter } from 'shared/api/types';
import { config } from 'shared/config';
import { formatStatistic } from 'shared/lib/helpers';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';

export const formatVideos = (data: Video[] | undefined) => ({
  count: data?.length || 0,
  ids: data?.map((el) => el.id) || [],
  items: Object.entries(ColumnVideo).map(([key, title]) => ({
    title,
    key: key as keyof typeof ColumnVideo,
    ...{
      filterType:
        key !== 'name' ? ('range' as Filter['filterType']) : undefined,
    },
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
        : formatStatistic(data, key as keyof Video['statistics']),
  })),
});
