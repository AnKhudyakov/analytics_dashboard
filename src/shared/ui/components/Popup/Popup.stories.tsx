import { Meta, StoryObj } from '@storybook/react';
import { Popup } from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'Shared/Popup',
  component: Popup,
  decorators: [
    (Story) => (
      <div className="relative w-50 left-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const Defauilt: Story = {
  args: {},
};
