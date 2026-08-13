import { screen, within } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { server } from 'test/msw/server';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { type TrackedChannel } from 'entities/profile';
import { config } from 'shared/config';

import { ChannelCompare } from './ChannelCompare';

const CHANNELS: TrackedChannel[] = [
  {
    id: 'mine',
    title: 'My channel',
    thumbnail: null,
    country: 'US',
    subscribers: 1_000_000,
    views: 50_000_000,
    videos: 100,
  },
  {
    id: 'rival',
    title: 'Rival channel',
    thumbnail: null,
    country: 'DE',
    subscribers: 400_000,
    views: 9_000_000,
    videos: 300,
  },
];

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

const mockCompare = () =>
  server.use(
    http.get(`${config.backendUrl}/insights/compare`, () =>
      HttpResponse.json(compareResponse)
    )
  );

describe('ChannelCompare', () => {
  it('shows a card per channel with the period growth', async () => {
    mockCompare();
    renderWithProviders(<ChannelCompare channels={CHANNELS} ownId="mine" />);

    const cards = within(
      await screen.findByRole('list', { name: 'Compared channels' })
    );

    expect(cards.getAllByRole('listitem')).toHaveLength(2);
    expect(cards.getByText(/My channel · you/)).toBeInTheDocument();
    expect(cards.getByText('Rival channel')).toBeInTheDocument();
    expect(cards.getByText(/\+25\.0%/)).toBeInTheDocument();
    expect(cards.getByText(/\+5\.3%/)).toBeInTheDocument();
  });

  it('splits the field into your share and everyone elses', async () => {
    mockCompare();
    renderWithProviders(<ChannelCompare channels={CHANNELS} ownId="mine" />);

    const share = within(
      await screen.findByRole('list', { name: 'Your share of the field' })
    );

    expect(share.getByText('1M')).toBeInTheDocument();
    expect(share.getByText('400K')).toBeInTheDocument();
  });

  it('refetches the comparison when another metric is picked', async () => {
    const requested: string[] = [];
    server.use(
      http.get(`${config.backendUrl}/insights/compare`, ({ request }) => {
        requested.push(new URL(request.url).searchParams.get('metric') ?? '');
        return HttpResponse.json(compareResponse);
      })
    );

    const { user } = renderWithProviders(
      <ChannelCompare channels={CHANNELS} ownId="mine" />
    );

    await user.click(await screen.findByRole('button', { name: 'Views' }));

    expect(requested).toContain('subscriberCount');
    expect(requested).toContain('viewCount');
  });

  it('holds one card placeholder per channel while the comparison loads', () => {
    server.use(
      http.get(`${config.backendUrl}/insights/compare`, async () => {
        await delay(30);
        return HttpResponse.json(compareResponse);
      })
    );

    renderWithProviders(<ChannelCompare channels={CHANNELS} ownId="mine" />);

    const placeholders = within(
      screen.getByRole('status', { name: 'Loading' })
    );

    expect(placeholders.getAllByRole('listitem')).toHaveLength(2);
  });
});
