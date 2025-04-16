import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonExit } from 'shared/ui/components/ButtonExit';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { MobileSidebar } from './MobileSidebar';
import { FlexContainer, Nav, SidebarContainer } from './Sidebar.styles';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <MobileSidebar />
      <SidebarContainer>
        <FlexContainer>
          <Typography variant="title">YouTube Analytics</Typography>
          <ButtonExit onClick={handleExit} />
        </FlexContainer>
        <Nav>
          <SidebarItem to="/channels" icon={<Icons.home />} label="Channels" />
          <SidebarItem to="/videos" icon={<Icons.videos />} label="Videos" />
        </Nav>
      </SidebarContainer>
    </>
  );
};
