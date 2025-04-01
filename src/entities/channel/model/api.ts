import { api } from 'shared/api';
import { ChannelsResponse } from './types';

export const channelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchChannels: builder.query<ChannelsResponse, string>({
      query: (query: string) => ({
        url: '/search',
        params: {
          part: 'snippet',
          type: 'channel',
          q: query,
          maxResults: 10,
        },
      }),
    }),

    getChannelsStats: builder.query<ChannelsResponse, string>({
      query: (channelIds: string) => ({
        url: '/channels',
        params: {
          part: 'snippet,statistics',
          id: channelIds,
        },
      }),
    }),
  }),

  overrideExisting: false,
});
