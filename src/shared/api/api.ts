import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'shared/config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.backendUrl,
  paramsSerializer: (params) => {
    return new URLSearchParams({ ...params, key: config.apiKey }).toString();
  },
});

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
