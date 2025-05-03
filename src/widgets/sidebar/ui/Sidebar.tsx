import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCollapsedContext } from 'shared/context/CollapsedContext';
import { removeToken } from 'shared/lib/helpers';
import { Button } from 'shared/ui/components/Button';
import { ButtonExit } from 'shared/ui/components/ButtonExit';
import { Typography } from 'shared/ui/components/Typography';
import { Icons } from 'shared/ui/icons';
import { Settings } from 'widgets/settings';
import { MobileSidebar } from './MobileSidebar';
import {
  FlexContainer,
  Nav,
  SettingsWrapper,
  SidebarContainer,
  Wrapper,
} from './Sidebar.styles';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { collapsed, setCollapsed } = useCollapsedContext();

  const handleExit = () => {
    removeToken();
    navigate('/login');
  };

  const handleMenu = (value: boolean) => {
    setCollapsed(value);
  };

  return (
    <>
      <MobileSidebar />
      <SidebarContainer className={collapsed ? 'w-17' : 'w-66'}>
        <Wrapper>
          <FlexContainer>
            {!collapsed && (
              <Typography variant="subtitle">{t('sidebar.title')}</Typography>
            )}
            <ButtonExit onClick={handleExit} />
          </FlexContainer>
          <Nav>
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
          </Nav>
        </Wrapper>
        <SettingsWrapper className={collapsed ? 'flex-col' : 'flex-row'}>
          <div className={collapsed ?"":"w-22"}>
            <Settings row={collapsed ? false : true} />
          </div>
          <Button
            icon
            onClick={handleMenu.bind(this, collapsed ? false : true)}
          >
            {collapsed ? <Icons.arrowRight /> : <Icons.arrowLeft />}
          </Button>
        </SettingsWrapper>
      </SidebarContainer>
    </>
  );
};
