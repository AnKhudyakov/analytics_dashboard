import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken, setAccessToken } from 'shared/api/accessToken';
import { sessionRefreshed } from 'shared/api/sessionRefreshed';
import { config } from 'shared/config';

export const UNAUTHORIZED_STATUS = 401;

const REFRESH_PATH = '/auth/refresh';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: config.backendUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const isRefreshRequest = (args: string | FetchArgs) =>
  (typeof args === 'string' ? args : args.url) === REFRESH_PATH;

const tokenOf = (data: unknown) =>
  typeof data === 'object' && data !== null && 'token' in data
    ? String(data.token)
    : null;

let refreshing: Promise<string | null> | null = null;

const refreshOnce = (api: BaseQueryApi, extraOptions: object) => {
  refreshing ??= Promise.resolve(
    rawBaseQuery({ url: REFRESH_PATH, method: 'POST' }, api, extraOptions)
  )
    .then(({ data }) => tokenOf(data))
    .finally(() => {
      refreshing = null;
    });

  return refreshing;
};

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error?.status !== UNAUTHORIZED_STATUS ||
    isRefreshRequest(args) ||
    !getAccessToken()
  ) {
    return result;
  }

  const token = await refreshOnce(api, extraOptions);

  if (token === null) {
    setAccessToken(null);
    return result;
  }

  setAccessToken(token);
  api.dispatch(sessionRefreshed(token));

  return rawBaseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Channel', 'ChannelList', 'Profile', 'Video', 'VideoList'],
  endpoints: () => ({}),
});
