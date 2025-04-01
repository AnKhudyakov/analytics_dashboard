import { Channel } from 'entities/channel/model/types';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';

export const formatChannels = (data: Channel[]) => ({
  count: data.length,
  items: [
    {
      title: 'Name',
      values: data.map((el) => (
        <AvatarInfo
          key={el.id}
          src={el.snippet.thumbnails.default.url}
          alt={el.snippet.channelTitle}
          name={el.snippet.channelTitle}
        />
      )),
    },
    {
      title: 'Likes',
      values: data.map((el) => Number(el.statistics.likeCount) || 'No data'),
    },
    {
      title: 'Comments',
      values: data.map((el) => Number(el.statistics.commentCount) || 'No data'),
    },
    {
      title: 'Favorites',
      values: data.map(
        (el) => Number(el.statistics.favoriteCount) || 'No data'
      ),
    },
    {
      title: 'Views',
      values: data.map((el) => Number(el.statistics.viewCount) || 'No data'),
    },
  ],
});
