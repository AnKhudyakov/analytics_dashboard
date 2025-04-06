import { Meta, StoryObj } from '@storybook/react';
import { Loader } from '../Loader';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Loading: Story = {
  args: {
    children: <Loader />,
  },
};
