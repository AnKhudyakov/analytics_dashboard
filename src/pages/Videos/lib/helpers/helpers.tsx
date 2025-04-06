import { Video } from 'entities/video';
import { config } from 'shared/config';
import { formatStatistic } from 'shared/lib/helpers/helpers';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';

export const formatVideos = (data: Video[] | undefined) => ({
  count: data?.length || 0,
  ids: data?.map((el) => el.id) || [],
  items: [
    {
      title: 'Name',
      values:
        data?.map((el) => (
          <AvatarInfo
            key={el.id}
            src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(el.snippet.thumbnails.default.url)}`}
            alt={el.snippet.title}
            name={el.snippet.title}
          />
        )) || [],
    },
    { title: 'Likes', values: formatStatistic(data, 'likeCount') },
    { title: 'Views', values: formatStatistic(data, 'viewCount') },
    { title: 'Comments', values: formatStatistic(data, 'commentCount') },
    { title: 'Favorites', values: formatStatistic(data, 'favoriteCount') },
  ],
});
