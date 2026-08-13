import { baseApi } from 'shared/api';

import {
  type CategoryInsight,
  type CompareMetric,
  type CompareResponse,
  type CountryInsight,
  type InsightsSummary,
} from '../model/types';

export const insightsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInsightsSummary: builder.query<InsightsSummary, void>({
      query: () => ({ url: '/insights/summary' }),
      providesTags: [{ type: 'ChannelList', id: 'LIST' }],
    }),

    getInsightsCategories: builder.query<CategoryInsight[], void>({
      query: () => ({ url: '/insights/categories' }),
      providesTags: [{ type: 'VideoList', id: 'LIST' }],
    }),

    getInsightsCountries: builder.query<CountryInsight[], number | void>({
      query: (limit) => ({
        url: '/insights/countries',
        params: { limit: limit ?? 8 },
      }),
      providesTags: [{ type: 'ChannelList', id: 'LIST' }],
    }),

    compareChannels: builder.query<
      CompareResponse,
      { ids: string[]; metric: CompareMetric; days?: number }
    >({
      query: ({ ids, metric, days = 90 }) => ({
        url: '/insights/compare',
        params: { ids: ids.join(','), metric, days },
      }),
      providesTags: [{ type: 'ChannelList', id: 'LIST' }],
    }),
  }),
});

export const {
  useCompareChannelsQuery,
  useGetInsightsCategoriesQuery,
  useGetInsightsCountriesQuery,
  useGetInsightsSummaryQuery,
} = insightsApi;
