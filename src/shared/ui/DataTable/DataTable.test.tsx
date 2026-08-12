import { screen, within } from '@testing-library/react';
import { renderWithProviders } from 'test/renderWithProviders';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from './DataTable';
import { type Column, type DataTableProps } from './types';

interface Row {
  id: string;
  name: string;
  views: number;
}

const columns: readonly Column<Row>[] = [
  { key: 'name', titleKey: 'columns.name', renderCell: (row) => row.name },
  {
    key: 'viewCount',
    titleKey: 'columns.views',
    filterType: 'range',
    renderCell: (row) => row.views,
  },
];

const rows: Row[] = [
  { id: 'a', name: 'Alpha', views: 10 },
  { id: 'b', name: 'Beta', views: 20 },
];

const setup = (overrides: Partial<DataTableProps<Row>> = {}) => {
  const props: DataTableProps<Row> = {
    columns,
    rows,
    total: rows.length,
    getRowId: (row) => row.id,
    getRowHref: (row) => `/channels/${row.id}`,
    isLoading: false,
    isError: false,
    onRetry: vi.fn(),
    emptyText: 'No channels found',
    sortBy: 'name',
    sortOrder: 'asc',
    onSortChange: vi.fn(),
    filters: {},
    onFiltersChange: vi.fn(),
    ...overrides,
  };

  return { props, ...renderWithProviders(<DataTable {...props} />) };
};

const desktopTable = () => screen.getByRole('table');

describe('DataTable', () => {
  it('renders one row per item with a link to the details page', () => {
    setup();

    const body = within(desktopTable()).getAllByRole('rowgroup')[1];
    expect(within(body!).getAllByRole('row')).toHaveLength(2);
    expect(within(body!).getByRole('link', { name: 'Alpha' })).toHaveAttribute(
      'href',
      '/channels/a'
    );
  });

  it('exposes the sort direction of the active column to assistive tech', () => {
    setup({ sortBy: 'viewCount', sortOrder: 'desc' });

    const headers = within(desktopTable()).getAllByRole('columnheader');
    expect(headers[0]).toHaveAttribute('aria-sort', 'none');
    expect(headers[1]).toHaveAttribute('aria-sort', 'descending');
  });

  it('requests a sort change when a column header is activated', async () => {
    const { props, user } = setup();

    await user.click(
      within(desktopTable()).getAllByRole('button', { name: 'Views' })[0]!
    );

    expect(props.onSortChange).toHaveBeenCalledWith('viewCount');
  });

  it('shows the loading state instead of rows', () => {
    setup({ isLoading: true, rows: [] });

    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('offers a retry action when loading failed', async () => {
    const { props, user } = setup({ isError: true, rows: [] });

    await user.click(screen.getAllByRole('button', { name: 'Reload' })[0]!);

    expect(props.onRetry).toHaveBeenCalled();
  });

  it('only offers clearing filters when some are active', () => {
    const { unmount } = setup({ rows: [], total: 0 });
    expect(
      screen.queryByRole('button', { name: 'Clear all filters' })
    ).not.toBeInTheDocument();
    unmount();

    setup({
      rows: [],
      total: 0,
      filters: {
        viewCount: { filterType: 'range', filterValue: { valueFrom: 1 } },
      },
    });
    expect(
      screen.getAllByRole('button', { name: 'Clear all filters' }).length
    ).toBeGreaterThan(0);
  });

  it('opens a column filter and closes it with Escape', async () => {
    const { user } = setup();

    const filterButton = within(desktopTable()).getAllByRole('button', {
      name: 'Filter by Views',
    })[0]!;

    await user.click(filterButton);
    expect(filterButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      within(desktopTable()).getByRole('dialog', { name: 'Filter by Views' })
    ).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(filterButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies a range filter through the popup', async () => {
    const { props, user } = setup();

    await user.click(
      within(desktopTable()).getAllByRole('button', {
        name: 'Filter by Views',
      })[0]!
    );
    const dialog = within(desktopTable()).getByRole('dialog');
    await user.type(within(dialog).getByLabelText('From'), '15');
    await user.click(within(dialog).getByRole('button', { name: 'Apply' }));

    expect(props.onFiltersChange).toHaveBeenCalledWith({
      viewCount: { filterType: 'range', filterValue: { valueFrom: 15 } },
    });
  });
});
