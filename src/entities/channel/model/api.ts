import { youtubeApi } from 'shared/api';
import { encodeFilters } from 'shared/lib/helpers';
import {
  ChannelAnalytics,
  ChannelsDTO,
  ChannelsResponse,
  ChannelsSearchDTO,
  ChannelStats,
} from './types';

export const channelApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    searchChannels: builder.query<ChannelsResponse, ChannelsSearchDTO>({
      query: ({ search, page, limit, sortBy, sortOrder, filters }) => ({
        url: '/channels/search',
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

    getChannels: builder.query<ChannelsResponse, ChannelsDTO>({
      query: ({ page, limit, sortBy, sortOrder, filters }) => ({
        url: '/channels',
        params: {
          page,
          limit,
          sortBy,
          sortOrder,
          filters: encodeFilters(filters),
        },
      }),
    }),

    getChannelAnalytics: builder.query<ChannelAnalytics, string | undefined>({
      query: (channelId) => ({
        url: `/channels/analytics`,
        params: {
          id: channelId,
        },
      }),
    }),

    getChannelStats: builder.query<ChannelStats[], string | undefined>({
      query: (channelId) => ({
        url: `/channels/stats`,
        params: {
          id: channelId,
        },
      }),
    }),
  }),

  overrideExisting: false,
});
