import { baseApi } from 'shared/api';

import { type Profile } from '../model/types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({ url: '/profile' }),
      providesTags: [{ type: 'Profile', id: 'ME' }],
    }),

    updateProfile: builder.mutation<
      Profile,
      { displayName?: string; channelId?: string }
    >({
      query: (body) => ({ url: '/profile', method: 'PATCH', body }),
      invalidatesTags: [{ type: 'Profile', id: 'ME' }],
    }),

    trackCompetitor: builder.mutation<Profile, string>({
      query: (channelId) => ({
        url: '/profile/competitors',
        method: 'POST',
        body: { channelId },
      }),
      invalidatesTags: [{ type: 'Profile', id: 'ME' }],
    }),

    untrackCompetitor: builder.mutation<Profile, string>({
      query: (channelId) => ({
        url: `/profile/competitors/${channelId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Profile', id: 'ME' }],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useTrackCompetitorMutation,
  useUntrackCompetitorMutation,
} = profileApi;
