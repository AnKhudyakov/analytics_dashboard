import { PageInfo, Snippet } from 'shared/api/types';

export interface Video {
  id: string;
  etag: string;
  snippet: Snippet;
  statistics: {
    favoriteCount: string;
    viewCount: string;
    commentCount: string;
    likeCount: string;
  };
}

export interface VideosResponse {
  items: Video[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

// export interface SearchChannel {
//   id: { channelId: string };
//   etag: string;
//   snippet: Snippet;
//   statistics: {
//     favoriteCount: string;
//     viewCount: string;
//     commentCount: string;
//     likeCount: string;
//   };
// }
