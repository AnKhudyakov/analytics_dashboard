import { youtubeApi } from 'shared/api';
import { encodeFilters } from 'shared/lib/helpers';
import { VideosDTO, VideosResponse, VideosSearchDTO } from './types';

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
  }),

  overrideExisting: false,
});
