import { Meta, StoryObj } from '@storybook/react';
import { AvatarInfo } from './AvatarInfo';

const meta: Meta<typeof AvatarInfo> = {
  title: 'Shared/AvatarInfo',
  component: AvatarInfo,
};

export default meta;
type Story = StoryObj<typeof AvatarInfo>;

export const Default: Story = {
  args: {
    src: 'https://yt3.ggpht.com/z3AOStrEznwieoK8HCfHi9nNQiPUiycJMEDYwZ5ufnaIS8YQRMj-X8lZpwtMnBsv89kcVUwewA=s88-c-k-c0x00ffffff-no-rj',
    alt: 'MileyCyrusVEVO',
    name: 'MileyCyrusVEVO',
  },
};
