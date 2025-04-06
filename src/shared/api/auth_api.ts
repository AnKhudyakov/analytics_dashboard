import { youtubeApi } from './youtube_api';

export interface Login {
  username: string;
  password: string;
}

export const authApi = youtubeApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string }, Login>({
      query: ({ username, password }) => ({
        url: `/login`,
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
