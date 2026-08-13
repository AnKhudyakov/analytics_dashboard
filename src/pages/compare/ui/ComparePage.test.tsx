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

const withCompetitor = {
  ...profile,
  competitors: [
    {
      id: 'rival',
      title: 'Rival channel',
      thumbnail: null,
      country: 'DE',
      subscribers: 400_000,
      views: 9_000_000,
      videos: 300,
    },
  ],
};

const compareResponse = {
  metric: 'subscriberCount',
  channels: [
    { id: 'mine', title: 'My channel' },
    { id: 'rival', title: 'Rival channel' },
  ],
  points: [
    { date: '2026-01-01', mine: 800_000, rival: 380_000 },
    { date: '2026-02-01', mine: 1_000_000, rival: 400_000 },
  ],
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
  it('leaves the metric tabs usable while the profile is loading', () => {
    mockProfile();
    renderWithProviders(<ComparePage />, { route: '/compare' });

    const tabs = within(screen.getByRole('group', { name: 'Metric' }));

    expect(tabs.getByRole('button', { name: 'Subscribers' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(tabs.getByRole('button', { name: 'Views' })).toBeEnabled();
  });

  it('compares the metric picked in the tabs', async () => {
    const requested: string[] = [];
    server.use(
      http.get(`${config.backendUrl}/profile`, () =>
        HttpResponse.json(withCompetitor)
      ),
      http.get(`${config.backendUrl}/insights/compare`, ({ request }) => {
        requested.push(new URL(request.url).searchParams.get('metric') ?? '');
        return HttpResponse.json(compareResponse);
      })
    );

    const { user } = renderWithProviders(<ComparePage />, {
      route: '/compare',
    });

    await user.click(await screen.findByRole('button', { name: 'Views' }));

    expect(requested).toContain('subscriberCount');
    expect(requested).toContain('viewCount');
  });
});
