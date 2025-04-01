import { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Shared/Typography',
  component: Typography,
  args: {
    variant: 'body',
    children: 'Пример текста',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'Заголовок',
  },
};

export const Subtitle: Story = {
  args: {
    variant: 'subtitle',
    children: 'Подзаголовок',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Обычный текст',
  },
};
