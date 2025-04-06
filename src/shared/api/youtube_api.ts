import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'shared/config';

const baseQuery = fetchBaseQuery({
  baseUrl: config.backendUrl,
  paramsSerializer: (params) => {
    return new URLSearchParams({
      ...params, //key: config.apiKey
    }).toString();
  },
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
