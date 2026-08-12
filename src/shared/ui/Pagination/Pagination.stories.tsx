import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Pagination } from './Pagination';

const meta = {
  title: 'Shared/Pagination',
  component: Pagination,
  args: {
    total: 5000,
    page: 1,
    rowsPerPage: 10,
    onPageChange: fn(),
    onRowsPerPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LastPage: Story = {
  args: { page: 500 },
};

export const Empty: Story = {
  args: { total: 0 },
};
