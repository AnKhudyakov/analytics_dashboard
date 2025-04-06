import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Shared/Typography',
  component: Typography,
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'Title',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    children: 'Subtitle',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Usual text',
  },
};
