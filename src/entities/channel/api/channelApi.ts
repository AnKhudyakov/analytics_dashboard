import { baseApi } from 'shared/api';
import { serializeFilters } from 'shared/lib/filters';

import {
  type ChannelAnalytics,
  type ChannelsQuery,
  type ChannelsResponse,
  type ChannelStats,
} from '../model/types';

export const channelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query<ChannelsResponse, ChannelsQuery>({
      query: ({ search, page, limit, sortBy, sortOrder, filters }) => ({
        url: search ? '/channels/search' : '/channels',
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
        { type: 'ChannelList' as const, id: 'LIST' },
        ...(result?.items ?? []).map((channel) => ({
          type: 'Channel' as const,
          id: channel.id,
        })),
      ],
    }),

    getChannelAnalytics: builder.query<ChannelAnalytics, string>({
      query: (channelId) => ({
        url: '/channels/analytics',
        params: { id: channelId },
      }),
      providesTags: (_result, _error, channelId) => [
        { type: 'Channel', id: channelId },
      ],
    }),

    getChannelStats: builder.query<ChannelStats[], string>({
      query: (channelId) => ({
        url: '/channels/stats',
        params: { id: channelId },
      }),
      providesTags: (_result, _error, channelId) => [
        { type: 'Channel', id: channelId },
      ],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetChannelAnalyticsQuery,
  useGetChannelStatsQuery,
} = channelApi;
