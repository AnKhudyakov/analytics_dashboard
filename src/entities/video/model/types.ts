import { Filters, PageInfo, Snippet } from 'shared/api/types';

export interface Video {
  id: string;
  etag: string;
  snippet: Snippet;
  kind?: string;
  statistics: {
    favoriteCount: number;
    viewCount: number;
    commentCount: number;
    likeCount: number;
  };
  stats: VideoStats[];
}

export interface VideoStats {
  id: string;
  insertedAt: string;
  viewCount: number;
  viewCountDelta: number;
  date: string;
  estimatedLowRevenueUsd: number;
  estimatedHighRevenueUsd: number;
  estimatedRevenueUsd: number;
  rollingRevenue: number;
  rollingLowRevenue: number;
  rollingHighRevenue: number;
}

export interface VideosResponse {
  items: Video[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export interface VideosDTO {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'desc' | 'asc';
  filters: Filters;
}

export interface VideosSearchDTO extends VideosDTO {
  search: string;
}

export enum ColumnVideo {
  name = 'Name',
  likeCount = 'Likes',
  viewCount = 'Views',
  commentCount = 'Comments',
  favoriteCount = 'Favorites',
}
