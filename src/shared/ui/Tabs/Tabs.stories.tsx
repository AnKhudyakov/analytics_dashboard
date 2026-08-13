import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Tabs } from './Tabs';

const TABS = [
  { id: 'subscribers', label: 'Subscribers' },
  { id: 'views', label: 'Views' },
  { id: 'videos', label: 'Videos' },
  { id: 'revenue', label: 'Estimated revenue' },
];

const MetricTabs = ({ label }: { label: string }) => {
  const [active, setActive] = useState('views');

  return (
    <Tabs tabs={TABS} active={active} onChange={setActive} label={label} />
  );
};

const meta: Meta<typeof Tabs> = {
  title: 'Shared/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Metrics: Story = {
  args: { label: 'Metric' },
  render: ({ label }) => <MetricTabs label={label} />,
};
