import { PageInfo, Snippet } from 'shared/api/types';

export interface ChannelsResponse {
  items: Channel[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface Channel {
  etag: string;
  id: string;
  kind?: string;
  snippet: Snippet;
  statistics: {
    subscriberCount: string;
    viewCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
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
  insertedAt: string; // Дата и время вставки записи (ISO строка)
  subscriberCount: number; // Общее количество подписчиков
  subscriberCountDelta: number; // Изменение количества подписчиков за день
  viewCount: number; // Общее количество просмотров
  viewCountDelta: number; // Изменение количества просмотров за день
  videoCount: number; // Общее количество видео
  videoCountDelta: number; // Изменение количества видео за день
  date: string; // Дата записи (ISO строка)
  estimatedLowRevenueUsd: number; // Минимальная оценка дохода в USD
  estimatedHighRevenueUsd: number; // Максимальная оценка дохода в USD
  estimatedRevenueUsd: number; // Средняя оценка дохода в USD
  dayOfWeek: string; // День недели (например, "FRIDAY")
  isToday: boolean; // Флаг, указывающий, является ли эта запись сегодняшним днем
}
