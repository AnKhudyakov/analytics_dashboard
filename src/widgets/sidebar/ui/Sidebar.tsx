import { FC } from 'react';
import { Search } from 'shared/ui/components/Search';
import { Icons } from 'shared/ui/icons';
import { SidebarContainer } from './Sidebar.styles';
import { SidebarItem } from './SidebarItem';
import { Typography } from 'shared/ui/components/Typography';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  return (
    <SidebarContainer>
      <Typography variant='title'>Analytics</Typography>
      <Search />
      <nav className="flex-1 mt-4">
        <SidebarItem
          to="/"
          icon={<Icons.home height={14} width={14} />}
          label="Channels"
        />
      </nav>
    </SidebarContainer>
  );
};
