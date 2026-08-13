import { screen, within } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { server } from 'test/msw/server';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { config } from 'shared/config';

import { ComparePage } from './ComparePage';

const profile = {
  username: 'admin',
  displayName: 'Admin',
  email: 'admin@example.test',
  role: 'admin',
  channel: {
    id: 'mine',
    title: 'My channel',
    thumbnail: null,
    country: 'US',
    subscribers: 1_000_000,
    views: 50_000_000,
    videos: 100,
  },
  competitors: [],
};

const mockProfile = () =>
  server.use(
    http.get(`${config.backendUrl}/profile`, async () => {
      await delay(20);
      return HttpResponse.json(profile);
    })
  );

describe('ComparePage', () => {
  it('keeps the page title while the profile is still loading', () => {
    mockProfile();
    renderWithProviders(<ComparePage />, { route: '/compare' });

    expect(
      screen.getByRole('heading', { name: 'Compare' })
    ).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('lays the loading state out as the cards and panels that follow it', () => {
    mockProfile();
    renderWithProviders(<ComparePage />, { route: '/compare' });

    const placeholders = within(screen.getByRole('status'));

    expect(placeholders.getAllByRole('listitem')).toHaveLength(4);
  });

  it('asks for competitors instead of comparing a single channel', async () => {
    mockProfile();
    renderWithProviders(<ComparePage />, { route: '/compare' });

    expect(
      await screen.findByText(/Add at least one competitor/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Compare' })
    ).toBeInTheDocument();
  });
});
