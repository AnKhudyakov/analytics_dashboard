import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it } from 'vitest';

import { WorldMap, type WorldMapMarker } from './WorldMap';

const MARKERS: WorldMapMarker[] = [
  {
    id: 'channel-1',
    label: 'My channel',
    country: 'US',
    value: 2_500_000,
    href: '/channels/channel-1',
    isOwn: true,
  },
  {
    id: 'channel-2',
    label: 'Rival channel',
    country: 'US',
    value: 900_000,
    href: '/channels/channel-2',
  },
  {
    id: 'channel-3',
    label: 'German rival',
    country: 'DE',
    value: 400_000,
    href: '/channels/channel-3',
  },
  {
    id: 'channel-4',
    label: 'Unknown origin',
    country: null,
    value: 100,
    href: '/channels/channel-4',
  },
];

const renderMap = () =>
  renderWithProviders(
    <WorldMap
      markers={MARKERS}
      caption="Competitor map"
      valueLabel="subscribers"
      ownLabel="you"
      competitorLabel="Competitors"
      unplacedLabel="No country"
      openLabel="Open channel analytics"
      locale="en"
    />
  );

describe('WorldMap', () => {
  it('draws one marker per country and names its channels', () => {
    renderMap();

    const markers = screen.getAllByRole('button');

    expect(markers).toHaveLength(2);
    expect(markers[0]).toHaveAccessibleName(
      'United States: My channel — 2.5M subscribers, Rival channel — 900K subscribers'
    );
    expect(markers[1]).toHaveAccessibleName(
      'Germany: German rival — 400K subscribers'
    );
  });

  it('opens a tooltip with a link to every channel of the hovered country', async () => {
    const user = userEvent.setup();
    renderMap();

    await user.hover(screen.getAllByRole('button')[0] as Element);

    expect(screen.getByRole('link', { name: /My channel/ })).toHaveAttribute(
      'href',
      '/channels/channel-1'
    );
    expect(screen.getByRole('link', { name: /Rival channel/ })).toHaveAttribute(
      'href',
      '/channels/channel-2'
    );
  });

  it('lists channels that carry no country instead of dropping them', () => {
    renderMap();

    expect(screen.getByText(/No country: Unknown origin/)).toBeInTheDocument();
  });
});
