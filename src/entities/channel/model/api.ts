import { youtubeApi } from 'shared/api';
import {
  ChannelAnalytics,
  ChannelsResponse,
  ChannelStats,
} from './types';

export const channelApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    searchChannels: builder.query<
      ChannelsResponse,
      { search: string; page: number; limit: number }
    >({
      query: ({ search, page, limit }) => ({
        url: '/channels/search',
        params: {
          search: search,
          page,
          limit,
        },
      }),
    }),

    getChannels: builder.query<
      ChannelsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: '/channels',
        params: {
          page,
          limit,
          //part: 'snippet,statistics',
          //id: channelIds,
        },
      }),
    }),

    getChannelAnalytics: builder.query<ChannelAnalytics, string | undefined>({
      query: (channelId) => ({
        url: `/channels/analytics`,
        params: {
          //part: 'snippet,statistics,brandingSettings,contentDetails,contentOwnerDetails,localizations,status,topicDetails',
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

// export const channelAnalyticsApi = rapidApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getChannelDetailStats: builder.query<ChannelStats[], string | undefined>({
//       query: (username) => ({
//         url: `/channel_stats`,
//         params: {
//           username,
//           range: 'alltime',
//           groupBy: 'daily',
//           sortOrder: 'ASC',
//           withRevenue: 'true',
//           withEvents: 'false',
//           withBreakdown: 'false',
//           withToday: 'false',
//         },
//       }),
//     }),
//   }),
//   overrideExisting: false,
// });
