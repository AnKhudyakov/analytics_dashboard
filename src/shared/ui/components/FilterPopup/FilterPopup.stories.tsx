import { Meta, StoryObj } from '@storybook/react';
import { FilterPopup } from './FilterPopup';

const meta: Meta<typeof FilterPopup> = {
  title: 'Shared/FilterPopup',
  component: FilterPopup,
};

export default meta;
type Story = StoryObj<typeof FilterPopup>;

export const Loading: Story = {
  args: {},
};
