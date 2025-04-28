import { youtubeApi } from 'shared/api';
import { encodeFilters } from 'shared/lib/helpers';
import { Video, VideosDTO, VideosResponse, VideosSearchDTO } from './types';

export const videoApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    searchVideos: builder.query<VideosResponse, VideosSearchDTO>({
      query: ({ search, page, limit, sortBy, sortOrder, filters }) => ({
        url: 'videos/search',
        params: {
          search,
          page,
          limit,
          sortBy,
          sortOrder,
          filters: encodeFilters(filters),
        },
      }),
    }),

    getTrendingVideos: builder.query<VideosResponse, VideosDTO>({
      query: ({ page, limit, sortBy, sortOrder, filters }) => ({
        url: '/videos',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          filters: encodeFilters(filters),
        },
      }),
    }),

    getVideoAnalytics: builder.query<Video, string | undefined>({
      query: (channelId) => ({
        url: `/videos/analytics`,
        params: {
          id: channelId,
        },
      }),
    }),
  }),

  overrideExisting: false,
});
