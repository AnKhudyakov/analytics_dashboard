import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  clearPersistedToken,
  persistToken,
  readPersistedSession,
  readTokenExpiry,
  type StoredSession,
} from './tokenStorage';

export type SessionState = StoredSession;

const slice = createSlice({
  name: 'session',
  initialState: (): SessionState => readPersistedSession(),
  reducers: {
    sessionEstablished: (state, { payload }: PayloadAction<string>) => {
      persistToken(payload);
      state.token = payload;
      state.expiresAt = readTokenExpiry(payload);
    },
    sessionCleared: (state) => {
      clearPersistedToken();
      state.token = null;
      state.expiresAt = null;
    },
  },
  selectors: {
    selectToken: (state) => state.token,
    selectExpiresAt: (state) => state.expiresAt,
    selectIsAuthenticated: (state) =>
      Boolean(state.token) &&
      state.expiresAt !== null &&
      state.expiresAt > Date.now(),
  },
});

export const sessionReducer = slice.reducer;
export const sessionSliceName = slice.name;
export const { sessionEstablished, sessionCleared } = slice.actions;
export const { selectToken, selectExpiresAt, selectIsAuthenticated } =
  slice.selectors;
