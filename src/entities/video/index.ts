import { videoApi } from './model/api';

export const {
  useSearchVideosQuery,
  useGetTrendingVideosQuery,
  useGetVideoAnalyticsQuery,
} = videoApi;
export type { Video, VideosResponse } from './model/types';
