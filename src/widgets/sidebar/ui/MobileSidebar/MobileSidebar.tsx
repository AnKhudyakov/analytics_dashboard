import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/components/Button';
import { ButtonExit } from 'shared/ui/components/ButtonExit';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { SidebarItem } from '../SidebarItem';
import {
  Container,
  HeaderLeft,
  MobileHeader,
  Overlay,
} from './MobileSidebar.styles';

export const MobileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMenu = (value: boolean) => {
    setIsOpen(value);
  };

  useEffect(() => {
    handleMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    handleMenu(false);
  }, [location.pathname]);

  return (
    <>
      <MobileHeader>
        <HeaderLeft>
          <Button icon onClick={handleMenu.bind(this, true)}>
            <Icons.menu className="text-white fill-white" />
          </Button>
          <Typography variant="title">YouTube Analytics</Typography>
        </HeaderLeft>
        <ButtonExit onClick={handleExit} />
      </MobileHeader>

      {isOpen && <Overlay onClick={handleMenu.bind(this, false)} />}

      <Container className={isOpen ? 'translate-x-0' : '-translate-x-full'}>
        <div className="flex justify-between items-center">
          <Typography variant="title">Menu</Typography>
          <Button icon onClick={handleMenu.bind(this, false)}>
            <Icons.close />
          </Button>
        </div>
        <SidebarItem
          to="/channels"
          icon={<Icons.home />}
          label="Каналы"
        />
        <SidebarItem
          to="/videos"
          icon={<Icons.videos />}
          label="Видео"
        />
      </Container>
    </>
  );
};
