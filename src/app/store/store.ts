import {
  configureStore,
  createListenerMiddleware,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  sessionCleared,
  sessionReducer,
  sessionSliceName,
} from 'features/auth';
import { baseApi, UNAUTHORIZED_STATUS } from 'shared/api';

const createUnauthorizedListener = () => {
  const listener = createListenerMiddleware();

  listener.startListening({
    matcher: isRejectedWithValue,
    effect: (action, listenerApi) => {
      const payload: unknown = action.payload;
      const status =
        typeof payload === 'object' && payload !== null && 'status' in payload
          ? payload.status
          : undefined;

      if (status === UNAUTHORIZED_STATUS) {
        listenerApi.dispatch(sessionCleared());
      }
    },
  });

  return listener;
};

export const createAppStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [sessionSliceName]: sessionReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(createUnauthorizedListener().middleware)
        .concat(baseApi.middleware),
  });

export const store = createAppStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
