import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const SelectMenu: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const channels = canvas.getByRole('link', { name: 'Channels' });
    const videos = canvas.getByRole('link', { name: 'Videos' });
    const button = canvas.getByRole('button');
    await userEvent.click(channels, { delay: 300 });
    await userEvent.click(videos, { delay: 300 });
    await userEvent.click(button, { delay: 300 });
  },
};
