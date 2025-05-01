import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeToken } from 'shared/lib/helpers';
import { Button } from 'shared/ui/components/Button';
import { ButtonExit } from 'shared/ui/components/ButtonExit';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { Settings } from 'widgets/settings';
import { SidebarItem } from '../SidebarItem';
import {
  Container,
  HeaderLeft,
  HeaderMenu,
  MobileHeader,
  Overlay,
} from './MobileSidebar.styles';

export const MobileSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleExit = () => {
    removeToken();
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
            <Icons.menu className="text-base-font fill-white" />
          </Button>
          <Typography variant="title">{t('sidebar.title')}</Typography>
        </HeaderLeft>
        <ButtonExit onClick={handleExit} />
      </MobileHeader>

      {isOpen && <Overlay onClick={handleMenu.bind(this, false)} />}

      <Container className={isOpen ? 'translate-x-0' : '-translate-x-full'}>
        <Settings />
        <HeaderMenu>
          <Typography variant="title">{t('sidebar.menu')}</Typography>
        </HeaderMenu>
        <div className="h-full">
          <SidebarItem
            to="/channels"
            icon={<Icons.home />}
            label={t('sidebar.channels')}
          />
          <SidebarItem
            to="/videos"
            icon={<Icons.videos />}
            label={t('sidebar.videos')}
          />
        </div>
        <div className="text-right">
          <Button icon onClick={handleMenu.bind(this, false)}>
            <Icons.arrowLeft />
          </Button>
        </div>
      </Container>
    </>
  );
};
