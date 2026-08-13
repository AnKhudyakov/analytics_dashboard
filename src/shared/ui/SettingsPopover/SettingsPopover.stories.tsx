import { type Meta, type StoryObj } from '@storybook/react';

import { SettingsPopover } from './SettingsPopover';
import { SettingsLabel, SettingsRow } from './SettingsPopover.styles';

const meta: Meta<typeof SettingsPopover> = {
  title: 'Shared/SettingsPopover',
  component: SettingsPopover,
};

export default meta;
type Story = StoryObj<typeof SettingsPopover>;

export const Gear: Story = {
  args: { label: 'Settings', placement: 'down' },
  render: (args) => (
    <SettingsPopover {...args}>
      <SettingsRow>
        <SettingsLabel>Theme</SettingsLabel>
        <button type="button">Dark</button>
      </SettingsRow>
      <SettingsRow>
        <SettingsLabel>Language</SettingsLabel>
        <button type="button">En</button>
      </SettingsRow>
    </SettingsPopover>
  ),
};
