import { compactNumber } from 'shared/lib/formatters';
import { proxiedImageUrl } from 'shared/lib/images';
import { AvatarInfo } from 'shared/ui/AvatarInfo';
import { type Column } from 'shared/ui/DataTable';
import { Icons } from 'shared/ui/icons';

import { type Channel } from '../model/types';

export const channelColumns: readonly Column<Channel>[] = [
  {
    key: 'name',
    titleKey: 'columns.name',
    renderCell: (channel) => (
      <AvatarInfo
        src={proxiedImageUrl(channel.snippet.thumbnails.default.url)}
        name={channel.snippet.title}
      />
    ),
  },
  {
    key: 'subscriberCount',
    titleKey: 'columns.subscribers',
    filterType: 'range',
    renderCell: (channel) => compactNumber(channel.statistics.subscriberCount),
  },
  {
    key: 'viewCount',
    titleKey: 'columns.views',
    filterType: 'range',
    renderCell: (channel) => compactNumber(channel.statistics.viewCount),
  },
  {
    key: 'hiddenSubscriberCount',
    titleKey: 'columns.hiddenSubscribers',
    filterType: 'checkbox',
    renderCell: (channel) =>
      channel.statistics.hiddenSubscriberCount ? (
        <Icons.yesIcon width={40} height={18} aria-hidden />
      ) : (
        <Icons.noIcon width={36} height={19} aria-hidden />
      ),
  },
  {
    key: 'videoCount',
    titleKey: 'columns.videos',
    filterType: 'range',
    renderCell: (channel) => compactNumber(channel.statistics.videoCount),
  },
];
