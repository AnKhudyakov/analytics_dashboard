import { screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from 'test/msw/server';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { config } from 'shared/config';

import { ChannelsPage } from './ChannelsPage';

const desktopTable = async () => within(await screen.findByRole('table'));

describe('ChannelsPage', () => {
  it('renders a row per channel returned by the API', async () => {
    renderWithProviders(<ChannelsPage />, { route: '/channels' });
    const table = await desktopTable();

    expect(await table.findByText('First channel')).toBeInTheDocument();
    expect(table.getByText('Second channel')).toBeInTheDocument();
    expect(table.getByRole('link', { name: /First channel/ })).toHaveAttribute(
      'href',
      '/channels/channel-1'
    );
  });

  it('formats large metrics compactly', async () => {
    renderWithProviders(<ChannelsPage />, { route: '/channels' });
    const table = await desktopTable();

    expect(await table.findByText('2.5M')).toBeInTheDocument();
    expect(table.getByText('5.4M')).toBeInTheDocument();
  });

  it('reads the search term from the URL and queries the search endpoint', async () => {
    renderWithProviders(<ChannelsPage />, { route: '/channels?search=Second' });
    const table = await desktopTable();

    expect(await table.findByText('Second channel')).toBeInTheDocument();
    expect(table.queryByText('First channel')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', async () => {
    renderWithProviders(<ChannelsPage />, {
      route: '/channels?search=nothing',
    });

    expect(await screen.findAllByText('No channels found')).not.toHaveLength(0);
  });

  it('lets the user retry after a failed request', async () => {
    let attempts = 0;
    server.use(
      http.get(`${config.backendUrl}/channels`, () => {
        attempts += 1;
        return attempts === 1
          ? HttpResponse.json({ message: 'boom' }, { status: 500 })
          : HttpResponse.json({
              items: [],
              pageInfo: { totalResults: 0, resultsPerPage: 10 },
            });
      })
    );

    const { user } = renderWithProviders(<ChannelsPage />, {
      route: '/channels',
    });

    const retry = (
      await screen.findAllByRole('button', { name: 'Reload' })
    )[0]!;
    await user.click(retry);

    expect(await screen.findAllByText('No channels found')).not.toHaveLength(0);
    expect(attempts).toBe(2);
  });

  it('reports the total result count to assistive tech', async () => {
    renderWithProviders(<ChannelsPage />, { route: '/channels' });

    expect(await screen.findByText('2 results found')).toBeInTheDocument();
  });

  it('renders pagination bounds from the API total', async () => {
    renderWithProviders(<ChannelsPage />, { route: '/channels' });
    const table = await desktopTable();

    expect(table.getAllByRole('columnheader')).toHaveLength(5);
    expect(screen.getByText(/1 - 2 of 2/)).toBeInTheDocument();
  });
});
