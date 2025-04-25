import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from 'shared/lib/helpers';
import { ButtonExit } from 'shared/ui/components/ButtonExit';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { Settings } from 'widgets/settings';
import { MobileSidebar } from './MobileSidebar';
import { FlexContainer, Nav, SidebarContainer } from './Sidebar.styles';
import { SidebarItem } from './SidebarItem';
import { useTranslation } from 'react-i18next';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleExit = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <>
      <MobileSidebar />
      <SidebarContainer>
        <FlexContainer>
          <Typography variant="title">{t('sidebar.title')}</Typography>
          <ButtonExit onClick={handleExit} />
        </FlexContainer>
        <Nav>
          <SidebarItem to="/channels" icon={<Icons.home />} label={t('sidebar.channels')} />
          <SidebarItem to="/videos" icon={<Icons.videos />} label={t('sidebar.videos')} />
        </Nav>
        <Settings />
      </SidebarContainer>
    </>
  );
};
