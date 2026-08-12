import { type Meta, type StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'Shared/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
  args: { height: '1rem' },
};

export const Block: Story = {
  args: { height: 280 },
};

export const Avatar: Story = {
  args: { width: '4rem', height: '4rem', circle: true },
};
