import { type Meta, type StoryObj } from '@storybook/react';

import { MetricInfo } from './MetricInfo';

const meta = {
  title: 'Shared/MetricInfo',
  component: MetricInfo,
  args: { title: 'Views', metric: '10.1K' },
} satisfies Meta<typeof MetricInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {
  args: { trend: { value: '28.1', isPositive: true } },
};

export const Negative: Story = {
  args: { trend: { value: '12.4', isPositive: false } },
};
