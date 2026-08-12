import { type FC, type ReactNode } from 'react';

import { LanguageSwitcher } from 'features/language-switcher';
import { ThemeSwitcher } from 'features/theme-switcher';
import { Toolbar } from 'shared/ui/Toolbar';
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
}) => (
  <Wrapper>
    <Container>
      <WelcomeTitle title={title} subtitle={subtitle} body={body} />
      <FormArea>
        {children}
        <SettingsWrapper>
          <Toolbar>
            <ThemeSwitcher />
            <LanguageSwitcher position="up" />
          </Toolbar>
        </SettingsWrapper>
      </FormArea>
    </Container>
  </Wrapper>
);
