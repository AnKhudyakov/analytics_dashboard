import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';

import { DataTable } from './DataTable';
import { type Column } from './types';

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
    renderCell: (row) => row.views.toLocaleString(),
  },
];

const rows: Row[] = [
  { id: '1', name: 'Channel one', views: 1200 },
  { id: '2', name: 'Channel two', views: 98_000 },
  { id: '3', name: 'Channel three', views: 4_500_000 },
];

const meta = {
  title: 'Shared/DataTable',
  component: DataTable,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    columns,
    rows,
    total: rows.length,
    getRowId: (row: Row) => row.id,
    getRowHref: (row: Row) => `/channels/${row.id}`,
    isLoading: false,
    isError: false,
    onRetry: fn(),
    emptyText: 'No channels found',
    sortBy: 'name',
    sortOrder: 'asc',
    onSortChange: fn(),
    filters: {},
    onFiltersChange: fn(),
  },
} satisfies Meta<typeof DataTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true, rows: [] },
};

export const Failed: Story = {
  args: { isError: true, rows: [] },
};

export const Empty: Story = {
  args: { rows: [], total: 0 },
};

export const EmptyWithFilters: Story = {
  args: {
    rows: [],
    total: 0,
    filters: {
      viewCount: { filterType: 'range', filterValue: { valueFrom: 10 } },
    },
  },
};
