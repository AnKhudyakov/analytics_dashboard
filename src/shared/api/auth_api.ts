import { Login, Signup } from './types';
import { youtubeApi } from './youtube_api';

export const authApi = youtubeApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string }, Login>({
      query: ({ username, password }) => ({
        url: `/login`,
        method: 'POST',
        body: { username, password },
      }),
    }),
    signup: build.mutation<void, Signup>({
      query: ({ username, email, password }) => ({
        url: `/signup`,
        method: 'POST',
        body: { username, email, password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = authApi;
