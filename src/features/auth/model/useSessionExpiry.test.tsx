import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeToken } from 'test/msw/handlers';
import { server } from 'test/msw/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createAppStore } from 'app/store';
import { config } from 'shared/config';

import { sessionEstablished } from './sessionSlice';
import { useSessionExpiry } from './useSessionExpiry';

const MINUTE = 60_000;

const wrapWith = (store: ReturnType<typeof createAppStore>) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return Wrapper;
};

afterEach(() => vi.useRealTimers());

describe('useSessionExpiry', () => {
  it('renews the access token before it expires', async () => {
    const renewed = makeToken(3600);
    server.use(
      http.post(`${config.backendUrl}/auth/refresh`, () =>
        HttpResponse.json({ token: renewed })
      )
    );

    vi.useFakeTimers({ shouldAdvanceTime: true });

    const store = createAppStore();
    store.dispatch(sessionEstablished(makeToken(120)));

    renderHook(() => useSessionExpiry(), { wrapper: wrapWith(store) });

    act(() => {
      vi.advanceTimersByTime(MINUTE + 1000);
    });

    await waitFor(() => expect(store.getState().session.token).toBe(renewed));
  });

  it('ends the session when the token can no longer be renewed', async () => {
    server.use(
      http.post(
        `${config.backendUrl}/auth/refresh`,
        () => new HttpResponse(null, { status: 401 })
      )
    );

    vi.useFakeTimers({ shouldAdvanceTime: true });

    const store = createAppStore();
    store.dispatch(sessionEstablished(makeToken(120)));

    renderHook(() => useSessionExpiry(), { wrapper: wrapWith(store) });

    act(() => {
      vi.advanceTimersByTime(MINUTE + 1000);
    });

    await waitFor(() => expect(store.getState().session.token).toBeNull());
  });
});
