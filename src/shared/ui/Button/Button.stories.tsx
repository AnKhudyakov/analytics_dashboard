import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Icons } from 'shared/ui/icons';

import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  args: { onClick: fn(), children: 'Click' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const IconOnly: Story = {
  args: {
    icon: true,
    'aria-label': 'Close',
    children: <Icons.close aria-hidden />,
  },
};
