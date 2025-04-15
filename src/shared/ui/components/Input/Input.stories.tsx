import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  args: {
    onChange: (e) => console.log('Input input changed:', e.target.value),
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {},
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'min',
  },
};

export const CheckboxChecked: Story = {
  args: {
    type: 'checkbox',
    placeholder: 'Label',
    checked: true,
  },
};

export const CheckboxUnChecked: Story = {
  args: {
    type: 'checkbox',
    placeholder: 'Label',
    checked: false,
  },
};
