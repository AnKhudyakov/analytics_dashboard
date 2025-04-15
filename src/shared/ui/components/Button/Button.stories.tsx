import { Meta, StoryObj } from '@storybook/react';
import { Loader } from '../Loader';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click',
    onClick: (e) => console.log('Button click'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Click',
    onClick: (e) => console.log('Button click'),
    disabled: true,
  },
};
