import { configureStore } from '@reduxjs/toolkit';
import { channelApi } from 'entities/channel/model/api';


export const store = configureStore({
  reducer: {
    [channelApi.reducerPath]: channelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
