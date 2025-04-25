import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from 'shared/config';
import { routerPaths } from 'shared/constants';
import { getToken, removeToken } from 'shared/lib/helpers';

const baseQuery = fetchBaseQuery({
  baseUrl: config.backendUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getToken()
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // expire token
    removeToken()
    if (window.location.pathname !== routerPaths.LOGIN_PATH) {
      window.location.href = routerPaths.LOGIN_PATH;
    }
  }

  return result;
};

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: () => ({}),
});
