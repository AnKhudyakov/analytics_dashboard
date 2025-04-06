import { Meta, StoryObj } from '@storybook/react';
import { MetricInfo } from './MetricInfo';

const meta: Meta<typeof MetricInfo> = {
  title: 'Shared/MetricInfo',
  component: MetricInfo,
};

export default meta;
type Story = StoryObj<typeof MetricInfo>;

export const Positive: Story = {
  args: {
    title: 'Views',
    metric: '10.1K',
    percent: '28.1',
    isPositive: true,
  },
};

export const Negative: Story = {
  args: {
    title: 'Views',
    metric: '10.1K',
    percent: '28.1',
  },
};
