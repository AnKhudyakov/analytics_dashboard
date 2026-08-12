import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Shared/Checkbox',
  component: Checkbox,
  args: { label: 'Remember me', onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: { checked: true },
};

export const Unchecked: Story = {
  args: { checked: false },
};
