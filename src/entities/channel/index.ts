import { channelApi } from './model/api';

export const { useSearchChannelsQuery, useGetChannelsStatsQuery } = channelApi;
export type { Channel, ChannelsResponse } from './model/types';
