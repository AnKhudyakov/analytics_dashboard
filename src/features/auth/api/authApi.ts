import { baseApi, sessionRefreshed } from 'shared/api';

import { type OAuthProviders } from '../model/oauth';
import { sessionCleared } from '../model/sessionSlice';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      invalidatesTags: [
        { type: 'ChannelList', id: 'LIST' },
        { type: 'VideoList', id: 'LIST' },
      ],
    }),
    refresh: builder.mutation<LoginResponse, void>({
      query: () => ({ url: '/auth/refresh', method: 'POST' }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(sessionRefreshed(data.token));
        } catch {
          dispatch(sessionCleared());
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    getOAuthProviders: builder.query<OAuthProviders, void>({
      query: () => ({ url: '/auth/providers' }),
    }),
    signup: builder.mutation<void, SignupRequest>({
      query: (body) => ({ url: '/signup', method: 'POST', body }),
    }),
  }),
});

export const {
  useGetOAuthProvidersQuery,
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useSignupMutation,
} = authApi;
