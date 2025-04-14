import { Meta, StoryObj } from '@storybook/react';
import { RangePopup } from './RangePopup';

const meta: Meta<typeof RangePopup> = {
  title: 'Shared/RangePopup',
  component: RangePopup,
};

export default meta;
type Story = StoryObj<typeof RangePopup>;

export const Loading: Story = {
  args: {},
};
