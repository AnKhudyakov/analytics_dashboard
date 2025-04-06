import { videoApi } from './model/api';

export const { useSearchVideosQuery, useGetTrendingVideosQuery, useGetVideosStatsQuery } = videoApi;
export type { Video, VideosResponse } from './model/types';
