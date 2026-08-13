import {
  type PaginatedResponse,
  type ResourceQuery,
  type Snippet,
} from 'shared/api';

export interface ChannelStatistics {
  subscriberCount: number;
  viewCount: number;
  hiddenSubscriberCount: boolean;
  videoCount: number;
}

export interface ChannelStats {
  id: string;
  insertedAt: string;
  date: string;
  dayOfWeek: string;
  isToday: boolean;
  subscriberCount: number;
  subscriberCountDelta: number;
  viewCount: number;
  viewCountDelta: number;
  videoCount: number;
  videoCountDelta: number;
  estimatedLowRevenueUsd: number;
  estimatedHighRevenueUsd: number;
  estimatedRevenueUsd: number;
}

export interface Channel {
  id: string;
  etag?: string;
  kind?: string;
  snippet: Snippet;
  statistics: ChannelStatistics;
  stats: ChannelStats[];
}

export interface ChannelAnalytics extends Channel {
  contentDetails?: {
    relatedPlaylists?: {
      likes?: string;
      uploads?: string;
    };
  };
  topicDetails?: {
    topicIds?: string[];
    topicCategories?: string[];
  };
  status?: {
    privacyStatus: string;
    isLinked: boolean;
    longUploadsStatus: string;
    madeForKids: boolean;
  };
  brandingSettings?: {
    channel?: {
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
}

export type ChannelsResponse = PaginatedResponse<Channel>;

export type ChannelsQuery = ResourceQuery;

export const CHANNELS_DEFAULT_SORT = 'name';

export interface AudienceSlice {
  label: string;
  share: number;
}

export interface ChannelAudience {
  channelId: string;
  trafficSources: AudienceSlice[];
  devices: AudienceSlice[];
  ageGroups: AudienceSlice[];
  genders: AudienceSlice[];
}
