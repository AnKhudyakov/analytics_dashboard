import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useLogout } from 'features/auth';
import { LanguageSwitcher } from 'features/language-switcher';
import { ThemeSwitcher } from 'features/theme-switcher';
import { Button } from 'shared/ui/Button';
import { ButtonExit } from 'shared/ui/ButtonExit';
import { Icons } from 'shared/ui/icons';
import { Toolbar } from 'shared/ui/Toolbar';
import { Typography } from 'shared/ui/Typography';

import { useSidebar } from '../model/SidebarProvider';
import { MobileSidebar } from './MobileSidebar';
import {
  FlexContainer,
  Nav,
  SettingsWrapper,
  SidebarContainer,
  Wrapper,
} from './Sidebar.styles';
import { SidebarNav } from './SidebarNav';

export const Sidebar: FC = () => {
  const { t } = useTranslation();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const logout = useLogout();

  return (
    <>
      <MobileSidebar />
      <SidebarContainer className={isCollapsed ? 'w-17' : 'w-66'}>
        <Wrapper>
          <FlexContainer>
            {!isCollapsed && (
              <Typography variant="subtitle">{t('sidebar.title')}</Typography>
            )}
            <ButtonExit label={t('sidebar.logout')} onClick={logout} />
          </FlexContainer>
          <Nav aria-label={t('sidebar.navigation')}>
            <SidebarNav isCollapsed={isCollapsed} />
          </Nav>
        </Wrapper>
        <SettingsWrapper className={isCollapsed ? 'flex-col' : 'flex-row'}>
          <div className={isCollapsed ? '' : 'w-22'}>
            <Toolbar direction={isCollapsed ? 'column' : 'row'}>
              <ThemeSwitcher />
              <LanguageSwitcher />
            </Toolbar>
          </div>
          <Button
            icon
            aria-label={t(isCollapsed ? 'sidebar.expand' : 'sidebar.collapse')}
            aria-expanded={!isCollapsed}
            onClick={toggleCollapsed}
          >
            {isCollapsed ? (
              <Icons.arrowRight aria-hidden />
            ) : (
              <Icons.arrowLeft aria-hidden />
            )}
          </Button>
        </SettingsWrapper>
      </SidebarContainer>
    </>
  );
};
