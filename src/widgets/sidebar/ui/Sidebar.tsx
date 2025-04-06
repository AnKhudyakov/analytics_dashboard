import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/components/Button';
import { Typography } from 'shared/ui/components/Typography';
import { hoverEffect } from 'shared/ui/effects';
import { Icons } from 'shared/ui/icons';
import { ExitIcon, FlexContainer, Nav, SidebarContainer } from './Sidebar.styles';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <FlexContainer>
        <Typography variant="title">Analytics</Typography>
        <Button icon className={hoverEffect} onClick={handleExit}>
          <ExitIcon
            width={30}
            height={30}
          />
        </Button>
      </FlexContainer>
      <Nav>
        <SidebarItem
          to="/channels"
          icon={<Icons.home height={14} width={14} />}
          label="Channels"
        />
        <SidebarItem
          to="/videos"
          icon={<Icons.home height={14} width={14} />}
          label="Videos"
        />
      </Nav>
    </SidebarContainer>
  );
};
