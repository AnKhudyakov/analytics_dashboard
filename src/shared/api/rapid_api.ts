import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'shared/config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.rapidApiUrl,
  prepareHeaders: (headers) => {
    headers.set('X-RapidAPI-Key', config.rapidApiKey);
    headers.set('X-RapidAPI-Host', 'viewstats.p.rapidapi.com');
    return headers;
  },
});

export const rapidApi = createApi({
  reducerPath: "rapidApi",
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
