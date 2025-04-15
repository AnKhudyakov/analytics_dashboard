import { Meta, StoryObj } from '@storybook/react';
import { FilterPopup } from './FilterPopup';

const meta: Meta<typeof FilterPopup> = {
  title: 'Shared/FilterPopup',
  component: FilterPopup,
  decorators: [
    (Story) => (
      <div className="relative w-50 left-10">
        <Story />
      </div>
    ),
  ],
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj<typeof FilterPopup>;

export const RangePopup: Story = {
  args: {
    type: 'range',
  },
};

export const CheckboxPopup: Story = {
  args: {
    type: 'checkbox',
  },
};
