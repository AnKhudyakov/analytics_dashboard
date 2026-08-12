import { baseApi } from 'shared/api';

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
    signup: builder.mutation<void, SignupRequest>({
      query: (body) => ({ url: '/signup', method: 'POST', body }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
