import { Channel } from 'entities/channel/model/types';
import { AvatarInfo } from 'shared/ui/components/AvatarInfo';
import { Icons } from 'shared/ui/icons';

export const formatChannels = (data: Channel[] | undefined) =>
  data
    ? {
        count: data?.length,
        items: [
          {
            title: 'Name',
            values: data.map((el) => (
              <AvatarInfo
                key={el.id.channelId}
                src={el.snippet.thumbnails.default.url}
                alt={el.snippet.title}
                name={el.snippet.title}
              />
            )),
          },
          {
            title: 'Subscribers',
            values: data.map(
              (el) => Number(el.statistics.subscriberCount) || 'No data'
            ),
          },
          {
            title: 'Views',
            values: data.map(
              (el) => Number(el.statistics.viewCount) || 'No data'
            ),
          },
          {
            title: 'Hidden Subscriber',
            values: data.map((el) =>
              el.statistics.hiddenSubscriberCount ? (
                <Icons.yesIcon width={40} height={18} />
              ) : (
                <Icons.noIcon width={36} height={19} />
              )
            ),
          },
          {
            title: 'Videos',
            values: data.map(
              (el) => Number(el.statistics.videoCount) || 'No data'
            ),
          },
        ],
      }
    : { count: 0, items: [] };
