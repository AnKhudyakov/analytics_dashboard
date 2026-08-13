import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { makeToken } from 'test/msw/handlers';
import { server } from 'test/msw/server';
import { afterEach, describe, expect, it } from 'vitest';

import { config } from 'shared/config';

import { setAccessToken } from './accessToken';
import { baseApi } from './baseApi';

const probeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    probe: builder.query<{ ok: boolean }, void>({
      query: () => ({ url: '/channels/probe' }),
    }),
  }),
});

const createStore = () =>
  configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });

afterEach(() => setAccessToken(null));

describe('baseApi', () => {
  it('refreshes the access token once a request comes back unauthorized', async () => {
    let accepted = false;
    const refreshed = makeToken(7200);

    server.use(
      http.post(`${config.backendUrl}/auth/refresh`, () => {
        accepted = true;
        return HttpResponse.json({ token: refreshed });
      }),
      http.get(`${config.backendUrl}/channels/probe`, ({ request }) =>
        accepted &&
        request.headers.get('authorization') === `Bearer ${refreshed}`
          ? HttpResponse.json({ ok: true })
          : new HttpResponse(null, { status: 401 })
      )
    );

    setAccessToken(makeToken(1800));
    const store = createStore();
    const result = await store.dispatch(
      probeApi.endpoints.probe.initiate(undefined)
    );

    expect(result.data).toEqual({ ok: true });
  });

  it('asks for a new token only once when several requests fail together', async () => {
    let refreshes = 0;
    const refreshed = makeToken(7200);

    server.use(
      http.post(`${config.backendUrl}/auth/refresh`, () => {
        refreshes += 1;
        return HttpResponse.json({ token: refreshed });
      }),
      http.get(`${config.backendUrl}/channels/probe`, ({ request }) =>
        request.headers.get('authorization') === `Bearer ${refreshed}`
          ? HttpResponse.json({ ok: true })
          : new HttpResponse(null, { status: 401 })
      )
    );

    setAccessToken(makeToken(1800));
    const store = createStore();

    await Promise.all([
      store.dispatch(probeApi.endpoints.probe.initiate(undefined)),
      store.dispatch(
        probeApi.endpoints.probe.initiate(undefined, { forceRefetch: true })
      ),
    ]);

    expect(refreshes).toBe(1);
  });

  it('gives up when the refresh itself is rejected', async () => {
    server.use(
      http.post(
        `${config.backendUrl}/auth/refresh`,
        () => new HttpResponse(null, { status: 401 })
      ),
      http.get(
        `${config.backendUrl}/channels/probe`,
        () => new HttpResponse(null, { status: 401 })
      )
    );

    setAccessToken(makeToken(1800));
    const store = createStore();
    const result = await store.dispatch(
      probeApi.endpoints.probe.initiate(undefined)
    );

    expect(result.error).toMatchObject({ status: 401 });
  });
});
