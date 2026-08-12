import { type Meta, type StoryObj } from '@storybook/react';

import { AvatarInfo } from './AvatarInfo';

const meta = {
  title: 'Shared/AvatarInfo',
  component: AvatarInfo,
} satisfies Meta<typeof AvatarInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://placehold.co/40x40',
    name: 'MileyCyrusVEVO',
  },
};
