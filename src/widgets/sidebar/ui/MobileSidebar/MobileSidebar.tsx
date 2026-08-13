import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useLogout } from 'features/auth';
import { LanguageSwitcher } from 'features/language-switcher';
import { ThemeSwitcher } from 'features/theme-switcher';
import { Button } from 'shared/ui/Button';
import { ButtonExit } from 'shared/ui/ButtonExit';
import { Icons } from 'shared/ui/icons';
import {
  SettingsField,
  SettingsLabel,
  SettingsPopover,
  SettingsRow,
} from 'shared/ui/SettingsPopover';
import { Typography } from 'shared/ui/Typography';

import { SidebarNav } from '../SidebarNav';
import {
  Container,
  HeaderLeft,
  HeaderMenu,
  MobileHeader,
  Overlay,
  SettingsWrapper,
} from './MobileSidebar.styles';

export const MobileSidebar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const logout = useLogout();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <MobileHeader>
        <HeaderLeft>
          <Button
            icon
            aria-label={t('sidebar.openMenu')}
            aria-expanded={isOpen}
            onClick={() => setOpen(true)}
          >
            <Icons.menu className="text-base-font" aria-hidden />
          </Button>
          <Typography variant="title">{t('sidebar.title')}</Typography>
        </HeaderLeft>
        <ButtonExit label={t('sidebar.logout')} onClick={logout} />
      </MobileHeader>

      {isOpen && <Overlay onClick={() => setOpen(false)} />}

      <Container
        className={isOpen ? 'translate-x-0' : '-translate-x-full'}
        aria-hidden={!isOpen}
      >
        <HeaderMenu>
          <Typography variant="title">{t('sidebar.menu')}</Typography>
        </HeaderMenu>
        <nav className="h-full" aria-label={t('sidebar.navigation')}>
          <SidebarNav />
        </nav>
        <SettingsWrapper>
          <SettingsPopover label={t('settings.title')} placement="up">
            <SettingsRow>
              <SettingsLabel>{t('settings.theme')}</SettingsLabel>
              <ThemeSwitcher />
            </SettingsRow>
            <SettingsField>
              <SettingsLabel>{t('settings.language')}</SettingsLabel>
              <LanguageSwitcher inline />
            </SettingsField>
          </SettingsPopover>
          <Button
            icon
            aria-label={t('sidebar.closeMenu')}
            onClick={() => setOpen(false)}
          >
            <Icons.arrowLeft aria-hidden />
          </Button>
        </SettingsWrapper>
      </Container>
    </>
  );
};
