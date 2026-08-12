import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { useTableParams } from './useTableParams';

const Probe = () => {
  const { params, setPage, setLimit, setSearch, setFilters, toggleSort } =
    useTableParams({ defaultSortBy: 'name' });
  const { search } = useLocation();

  return (
    <div>
      <output data-testid="params">{JSON.stringify(params)}</output>
      <output data-testid="query">{search}</output>
      <button onClick={() => setPage(3)}>page</button>
      <button onClick={() => setLimit(25)}>limit</button>
      <button onClick={() => setSearch('cats')}>search</button>
      <button onClick={() => toggleSort('name')}>sort-name</button>
      <button onClick={() => toggleSort('viewCount')}>sort-views</button>
      <button
        onClick={() =>
          setFilters({
            viewCount: { filterType: 'range', filterValue: { valueFrom: 5 } },
          })
        }
      >
        filter
      </button>
    </div>
  );
};

const renderProbe = (route = '/channels') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Probe />
    </MemoryRouter>
  );

const readParams = () =>
  JSON.parse(screen.getByTestId('params').textContent ?? '{}') as Record<
    string,
    unknown
  >;

describe('useTableParams', () => {
  it('falls back to defaults with an empty query string', () => {
    renderProbe();

    expect(readParams()).toMatchObject({
      page: 1,
      limit: 10,
      sortBy: 'name',
      sortOrder: 'asc',
      search: '',
      filters: {},
    });
  });

  it('reads state from the URL so links are shareable', () => {
    renderProbe(
      '/channels?page=4&limit=25&sort=viewCount&order=desc&search=cats'
    );

    expect(readParams()).toMatchObject({
      page: 4,
      limit: 25,
      sortBy: 'viewCount',
      sortOrder: 'desc',
      search: 'cats',
    });
  });

  it('ignores invalid page and limit values', () => {
    renderProbe('/channels?page=-2&limit=999');

    expect(readParams()).toMatchObject({ page: 1, limit: 10 });
  });

  it('writes changes back to the query string', async () => {
    const user = userEvent.setup();
    renderProbe();

    await act(() => user.click(screen.getByText('page')));
    expect(screen.getByTestId('query').textContent).toContain('page=3');
  });

  it('resets the page when the search term changes', async () => {
    const user = userEvent.setup();
    renderProbe('/channels?page=5');

    await act(() => user.click(screen.getByText('search')));

    expect(readParams()).toMatchObject({ page: 1, search: 'cats' });
    expect(screen.getByTestId('query').textContent).not.toContain('page=');
  });

  it('resets the page when the page size changes', async () => {
    const user = userEvent.setup();
    renderProbe('/channels?page=5');

    await act(() => user.click(screen.getByText('limit')));

    expect(readParams()).toMatchObject({ page: 1, limit: 25 });
  });

  it('resets the page when filters change', async () => {
    const user = userEvent.setup();
    renderProbe('/channels?page=5');

    await act(() => user.click(screen.getByText('filter')));

    expect(readParams()).toMatchObject({ page: 1 });
    expect(readParams().filters).toEqual({
      viewCount: { filterType: 'range', filterValue: { valueFrom: 5 } },
    });
  });

  it('toggles the direction for the active column and resets it for a new one', async () => {
    const user = userEvent.setup();
    renderProbe();

    await act(() => user.click(screen.getByText('sort-name')));
    expect(readParams()).toMatchObject({ sortBy: 'name', sortOrder: 'desc' });

    await act(() => user.click(screen.getByText('sort-views')));
    expect(readParams()).toMatchObject({
      sortBy: 'viewCount',
      sortOrder: 'asc',
    });
  });
});
