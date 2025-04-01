import { api } from 'shared/api';
import { Channel, ChannelsResponse } from './types';

export const channelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchChannels: builder.query<Channel[], string>({
      query: (query: string) => ({
        url: '/search',
        params: {
          part: 'snippet',
          type: 'channel',
          q: query,
          maxResults: 10,
        },
      }),
      transformResponse: (response: { items: Channel[] }) => response.items,
    }),

    getChannelsStats: builder.query<Channel[], string>({
      query: (channelIds: string) => ({
        url: '/channels',
        params: {
          part: 'snippet,statistics',
          id: channelIds,
        },
      }),
      transformResponse: (response: { items: Channel[] }) => response.items,
    }),

    getTrendingVideos: builder.query<
      ChannelsResponse,
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

export const {
  useSearchChannelsQuery,
  useGetChannelsStatsQuery,
  useGetTrendingVideosQuery,
} = channelApi;
