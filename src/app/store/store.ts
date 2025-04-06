import { configureStore } from '@reduxjs/toolkit';
import { rapidApi, youtubeApi } from 'shared/api/';

export const store = configureStore({
  reducer: {
    [rapidApi.reducerPath]: rapidApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rapidApi.middleware)
      .concat(youtubeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
