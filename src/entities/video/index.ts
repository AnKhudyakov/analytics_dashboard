import { videoApi } from './model/api';

export const { useSearchVideosQuery, useGetTrendingVideosQuery } = videoApi;
export type { Video, VideosResponse } from './model/types';
