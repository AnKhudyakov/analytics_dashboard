export interface ChannelsResponse {
  items: Channel[];
  prevPageToken?: string
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Channel {
  id: string;
  etag: string;
  snippet: {
    categoryId: string;
    channelTitle: string;
    tags: string[];
    thumbnails: {
      default: { url: string };
    };
    title: string;
  };
  statistics: {
    favoriteCount: string;
    viewCount: string;
    commentCount: string;
    likeCount: string;
  };
}
