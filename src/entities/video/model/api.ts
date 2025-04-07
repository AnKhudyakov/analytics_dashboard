import { youtubeApi } from 'shared/api';
import { VideosDTO, VideosResponse, VideosSearchDTO } from './types';

export const videoApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    searchVideos: builder.query<VideosResponse, VideosSearchDTO>({
      query: ({ search, page, limit, sortBy, sortOrder }) => ({
        url: 'videos/search',
        params: {
          search,
          page,
          limit,
          sortBy,
          sortOrder,
        },
      }),
    }),

    getVideosStats: builder.query<VideosResponse, string>({
      query: (videoIds) => ({
        url: '/videos',
        params: {
          part: 'snippet,statistics',
          id: videoIds,
        },
      }),
    }),

    getTrendingVideos: builder.query<VideosResponse, VideosDTO>({
      query: ({ page, limit, sortBy, sortOrder }) => ({
        url: '/videos',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
        },
      }),
    }),
  }),

  overrideExisting: false,
});
