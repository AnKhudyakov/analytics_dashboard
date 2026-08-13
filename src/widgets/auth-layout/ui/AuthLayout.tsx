import { type FC, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitcher } from 'features/language-switcher';
import { ThemeSwitcher } from 'features/theme-switcher';
import {
  SettingsField,
  SettingsLabel,
  SettingsPopover,
  SettingsRow,
} from 'shared/ui/SettingsPopover';
import { WelcomeTitle } from 'shared/ui/WelcomeTitle';

import {
  Container,
  FormArea,
  SettingsWrapper,
  Wrapper,
} from './AuthLayout.styles';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  body?: string;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  title,
  subtitle,
  body,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Container>
        <WelcomeTitle title={title} subtitle={subtitle} body={body} />
        <FormArea>
          {children}
          <SettingsWrapper>
            <SettingsPopover label={t('settings.title')} placement="down">
              <SettingsRow>
                <SettingsLabel>{t('settings.theme')}</SettingsLabel>
                <ThemeSwitcher />
              </SettingsRow>
              <SettingsField>
                <SettingsLabel>{t('settings.language')}</SettingsLabel>
                <LanguageSwitcher inline />
              </SettingsField>
            </SettingsPopover>
          </SettingsWrapper>
        </FormArea>
      </Container>
    </Wrapper>
  );
};
