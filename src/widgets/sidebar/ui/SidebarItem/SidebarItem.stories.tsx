import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Icons } from 'shared/ui/icons';
import { SidebarItem } from './SidebarItem';
import { SidebarItemProps } from './SidebarItem.def';

const meta: Meta<typeof SidebarItem> = {
  title: 'Widgets/Sidebar/SidebarItem',
  component: SidebarItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    to: { control: 'text' },
  },
};

export default meta;

const Template: StoryFn<SidebarItemProps> = (args) => <SidebarItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <Icons.home />,
  label: 'Channels',
  to: '/',
};
