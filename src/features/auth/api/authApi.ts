import { baseApi } from 'shared/api';

import { type OAuthProviders } from '../model/oauth';

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
  useSignupMutation,
} = authApi;
