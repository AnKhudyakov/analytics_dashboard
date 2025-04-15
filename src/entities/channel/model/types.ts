import { Filters, PageInfo, Snippet } from 'shared/api/types';

export interface ChannelsResponse {
  items: Channel[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface Channel {
  etag?: string;
  id: string;
  kind?: string;
  snippet: Snippet;
  statistics: {
    subscriberCount: number;
    viewCount: number;
    hiddenSubscriberCount: boolean;
    videoCount: number;
  };
}

export interface ChannelAnalyticsResponse {
  items: ChannelAnalytics[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface ChannelAnalytics extends Channel {
  contentDetails: {
    relatedPlaylists: {
      likes?: string;
      uploads?: string;
    };
  };
  topicDetails?: {
    topicIds?: string[];
    topicCategories?: string[];
  };
  status: {
    privacyStatus: string;
    isLinked: boolean;
    longUploadsStatus: string;
    madeForKids: boolean;
  };
  brandingSettings?: {
    channel: {
      title: string;
      description: string;
      keywords?: string;
      unsubscribedTrailer?: string;
      country?: string;
    };
    image?: {
      bannerExternalUrl?: string;
    };
  };
  contentOwnerDetails?: Record<string, unknown>;
}

export interface ChannelStats {
  id: string;
  insertedAt: string;
  subscriberCount: number;
  subscriberCountDelta: number;
  viewCount: number;
  viewCountDelta: number;
  videoCount: number;
  videoCountDelta: number;
  date: string;
  estimatedLowRevenueUsd: number;
  estimatedHighRevenueUsd: number;
  estimatedRevenueUsd: number;
  dayOfWeek: string;
  isToday: boolean;
}

export interface ChannelsDTO {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  filters: Filters;
}

export interface ChannelsSearchDTO extends ChannelsDTO {
  search: string;
}

export enum ColumnChannel {
  name = 'Name',
  subscriberCount = 'Subscribers',
  viewCount = 'Views',
  hiddenSubscriberCount = 'Hidden Subscriber',
  videoCount = 'Videos',
}
