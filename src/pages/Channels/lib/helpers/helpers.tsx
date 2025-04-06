import { Channel } from 'entities/channel/model/types';
import { config } from 'shared/config';
import { formatStatistic } from 'shared/lib/helpers/helpers';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';
import { Icons } from 'shared/ui/icons';

export const formatChannels = (data: Channel[] | undefined) => ({
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
    { title: 'Subscribers', values: formatStatistic(data, 'subscriberCount') },
    { title: 'Views', values: formatStatistic(data, 'viewCount') },
    {
      title: 'Hidden Subscriber',
      values:
        data?.map((el) =>
          el.statistics.hiddenSubscriberCount ? (
            <Icons.yesIcon width={40} height={18} />
          ) : (
            <Icons.noIcon width={36} height={19} />
          )
        ) || [],
    },
    { title: 'Videos', values: formatStatistic(data, 'videoCount') },
  ],
});
