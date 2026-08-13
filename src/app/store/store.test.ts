import { http, HttpResponse } from 'msw';
import { makeToken } from 'test/msw/handlers';
import { server } from 'test/msw/server';
import { describe, expect, it } from 'vitest';

import { channelApi } from 'entities/channel';
import { sessionCleared, sessionEstablished } from 'features/auth';
import { sessionRefreshed } from 'shared/api';
import { config } from 'shared/config';

import { createAppStore } from './store';

const CHANNELS_QUERY = {
  page: 1,
  limit: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  search: '',
  filters: {},
} as const;

const cachedQueries = (store: ReturnType<typeof createAppStore>) =>
  Object.keys(store.getState().api.queries);

const loadChannels = async (store: ReturnType<typeof createAppStore>) => {
  await store.dispatch(
    channelApi.endpoints.getChannels.initiate({ ...CHANNELS_QUERY })
  );
};

describe('app store', () => {
  it('drops what the previous account cached when a session starts', async () => {
    const store = createAppStore();
    store.dispatch(sessionEstablished(makeToken(900)));
    await loadChannels(store);

    expect(cachedQueries(store)).not.toHaveLength(0);

    store.dispatch(sessionEstablished(makeToken(1800)));

    expect(cachedQueries(store)).toHaveLength(0);
  });

  it('keeps the cache while a refreshed token replaces the old one', async () => {
    const store = createAppStore();
    store.dispatch(sessionEstablished(makeToken(900)));
    await loadChannels(store);

    store.dispatch(sessionRefreshed(makeToken(1800)));

    expect(cachedQueries(store)).not.toHaveLength(0);
  });

  it('ends the session when a request comes back unauthorized', async () => {
    server.use(
      http.get(
        `${config.backendUrl}/channels`,
        () => new HttpResponse(null, { status: 401 })
      )
    );

    const store = createAppStore();
    store.dispatch(sessionEstablished(makeToken(900)));
    await loadChannels(store);

    expect(store.getState().session.token).toBeNull();

    store.dispatch(sessionCleared());
  });
});
