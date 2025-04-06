import { youtubeApi } from 'shared/api';
import { VideosResponse } from './types';

export const videoApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    searchVideos: builder.query<VideosResponse, string>({
      query: (query) => ({
        url: '/search',
        params: {
          part: 'snippet',
          type: 'video',
          q: query,
          maxResults: 10,
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

    getTrendingVideos: builder.query<
      VideosResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: '/videos',
        params: {
          page,
          limit,
          // part: 'snippet,statistics',
          // chart: 'mostPopular',
          // regionCode: 'US',
          // maxResults: rowsPerPage,
          // key: import.meta.env.VITE_YOUTUBE_API_KEY,
          // pageToken,
        },
      }),
    }),
  }),

  overrideExisting: false,
});
