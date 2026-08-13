import { baseApi } from 'shared/api';
import { serializeFilters } from 'shared/lib/filters';

import {
  type Video,
  type VideoEngagement,
  type VideosQuery,
  type VideosResponse,
} from '../model/types';

export const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<VideosResponse, VideosQuery>({
      query: ({ search, page, limit, sortBy, sortOrder, filters }) => ({
        url: search ? '/videos/search' : '/videos',
        params: {
          ...(search ? { search } : {}),
          page,
          limit,
          sortBy,
          sortOrder,
          filters: serializeFilters(filters),
        },
      }),
      providesTags: (result) => [
        { type: 'VideoList' as const, id: 'LIST' },
        ...(result?.items ?? []).map((video) => ({
          type: 'Video' as const,
          id: video.id,
        })),
      ],
    }),

    getVideoEngagement: builder.query<VideoEngagement, string>({
      query: (videoId) => ({
        url: '/videos/engagement',
        params: { id: videoId },
      }),
      providesTags: (_result, _error, videoId) => [
        { type: 'Video', id: videoId },
      ],
    }),

    getVideoAnalytics: builder.query<Video, string>({
      query: (videoId) => ({
        url: '/videos/analytics',
        params: { id: videoId },
      }),
      providesTags: (_result, _error, videoId) => [
        { type: 'Video', id: videoId },
      ],
    }),
  }),
});

export const {
  useGetVideoAnalyticsQuery,
  useGetVideoEngagementQuery,
  useGetVideosQuery,
} = videoApi;
