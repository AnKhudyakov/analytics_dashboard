import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken } from 'shared/api/accessToken';
import { config } from 'shared/config';

export const UNAUTHORIZED_STATUS = 401;

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.backendUrl,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Channel', 'ChannelList', 'Profile', 'Video', 'VideoList'],
  endpoints: () => ({}),
});
