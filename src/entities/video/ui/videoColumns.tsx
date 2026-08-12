import { compactNumber } from 'shared/lib/formatters';
import { proxiedImageUrl } from 'shared/lib/images';
import { AvatarInfo } from 'shared/ui/AvatarInfo';
import { type Column } from 'shared/ui/DataTable';

import { type Video } from '../model/types';

export const videoColumns: readonly Column<Video>[] = [
  {
    key: 'name',
    titleKey: 'columns.name',
    renderCell: (video) => (
      <AvatarInfo
        src={proxiedImageUrl(video.snippet.thumbnails.default.url)}
        name={video.snippet.title}
      />
    ),
  },
  {
    key: 'likeCount',
    titleKey: 'columns.likes',
    filterType: 'range',
    renderCell: (video) => compactNumber(video.statistics.likeCount),
  },
  {
    key: 'viewCount',
    titleKey: 'columns.views',
    filterType: 'range',
    renderCell: (video) => compactNumber(video.statistics.viewCount),
  },
  {
    key: 'commentCount',
    titleKey: 'columns.comments',
    filterType: 'range',
    renderCell: (video) => compactNumber(video.statistics.commentCount),
  },
  {
    key: 'favoriteCount',
    titleKey: 'columns.favorites',
    filterType: 'range',
    renderCell: (video) => compactNumber(video.statistics.favoriteCount),
  },
];
