import {
  type PaginatedResponse,
  type ResourceQuery,
  type Snippet,
} from 'shared/api';

export interface VideoStatistics {
  favoriteCount: number;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

export interface VideoStats {
  id: string;
  insertedAt: string;
  date: string;
  viewCount: number;
  viewCountDelta: number;
  estimatedLowRevenueUsd: number;
  estimatedHighRevenueUsd: number;
  estimatedRevenueUsd: number;
  rollingRevenue: number;
  rollingLowRevenue: number;
  rollingHighRevenue: number;
}

export interface Video {
  id: string;
  etag?: string;
  kind?: string;
  snippet: Snippet;
  statistics: VideoStatistics;
  stats: VideoStats[];
}

export type VideosResponse = PaginatedResponse<Video>;

export type VideosQuery = ResourceQuery;

export const VIDEOS_DEFAULT_SORT = 'name';

export interface VideoEngagement {
  id: string;
  steps: { key: string; value: number }[];
  rates: {
    likeRate: number;
    commentRate: number;
    engagementRate: number;
  };
}
