import { channelApi } from './model/api';

//export const { useGetChannelDetailStatsQuery } = channelAnalyticsApi;
export const {
  useSearchChannelsQuery,
  useGetChannelsQuery,
  useGetChannelStatsQuery,
  useGetChannelAnalyticsQuery,
} = channelApi;

export type {
  Channel,
  ChannelAnalytics,
  ChannelsResponse,
} from './model/types';
