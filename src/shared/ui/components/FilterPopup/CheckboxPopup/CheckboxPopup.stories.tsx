import { Meta, StoryObj } from '@storybook/react';
import { CheckboxPopup } from './CheckboxPopup';

const meta: Meta<typeof CheckboxPopup> = {
  title: 'Shared/CheckboxPopup',
  component: CheckboxPopup,
};

export default meta;
type Story = StoryObj<typeof CheckboxPopup>;

export const Loading: Story = {
  args: {},
};
