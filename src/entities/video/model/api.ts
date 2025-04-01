import { api } from 'shared/api';
import { VideosResponse } from './types';

export const videoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchVideos: builder.query<VideosResponse, string>({
      query: (query: string) => ({
        url: '/search',
        params: {
          part: 'snippet',
          type: 'video',
          q: query,
          maxResults: 10,
        },
      }),
    }),

    getTrendingVideos: builder.query<
      VideosResponse,
      {
        pageToken: string;
        rowsPerPage: number;
      }
    >({
      query: ({ pageToken, rowsPerPage }) => ({
        url: 'videos',
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: 'US',
          maxResults: rowsPerPage,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          pageToken,
        },
      }),
    }),
  }),

  overrideExisting: false,
});
