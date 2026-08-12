import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Input } from './Input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: { label: 'Username', placeholder: 'Username', onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};

export const WithVisibleLabel: Story = {
  args: { hideLabel: false },
};

export const WithError: Story = {
  args: { error: 'Field is required' },
};

export const Search: Story = {
  args: { search: true, label: 'Search', placeholder: 'Search for...' },
};

export const NumberRange: Story = {
  args: { type: 'number', hideLabel: false, label: 'From', placeholder: 'Min' },
};
