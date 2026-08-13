import { act, renderHook } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { makeToken } from 'test/msw/handlers';
import { server } from 'test/msw/server';
import { describe, expect, it } from 'vitest';

import { createAppStore } from 'app/store';
import { channelApi } from 'entities/channel';
import { config } from 'shared/config';

import { sessionEstablished } from './sessionSlice';
import { useLogout } from './useLogout';

const wrapWith = (store: ReturnType<typeof createAppStore>) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return Wrapper;
};

describe('useLogout', () => {
  it('drops the session and everything the previous account had cached', async () => {
    server.use(
      http.get(`${config.backendUrl}/channels`, () =>
        HttpResponse.json({
          items: [],
          pageInfo: { totalResults: 0, resultsPerPage: 10 },
        })
      )
    );

    const store = createAppStore();
    store.dispatch(sessionEstablished(makeToken()));
    await store.dispatch(
      channelApi.endpoints.getChannels.initiate({
        page: 1,
        limit: 10,
        sortBy: 'name',
        sortOrder: 'asc',
        search: '',
        filters: {},
      })
    );

    expect(Object.keys(store.getState().api.queries)).not.toHaveLength(0);

    const { result } = renderHook(() => useLogout(), {
      wrapper: wrapWith(store),
    });
    act(() => result.current());

    expect(store.getState().session.token).toBeNull();
    expect(Object.keys(store.getState().api.queries)).toHaveLength(0);
    expect(localStorage.getItem('token')).toBeNull();
  });
});
