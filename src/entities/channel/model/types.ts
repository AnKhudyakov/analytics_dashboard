import { PageInfo, Snippet } from 'shared/api/types';

export interface ChannelsResponse {
  items: Channel[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface Channel {
  id: { channelId: string };
  etag: string;
  snippet: Snippet;
  statistics: {
    subscriberCount: string;
    viewCount: string;
    hiddenSubscriberCount: string;
    videoCount: string;
  };
}
