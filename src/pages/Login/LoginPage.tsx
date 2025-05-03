import { LoginForm } from 'features/auth/ui/LoginForm';
import { useTranslation } from 'react-i18next';
import { WelcomeTitle } from 'shared/ui/components/WelcomeTitle/WelcomeTitle';
import { Settings } from 'widgets/settings';
import {
  Container,
  SettingsWrapper,
  Wrapper,
  WrapperForm,
} from './LoginPage.styles';

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Container>
        <WelcomeTitle
          title={t('login.title')}
          subtitle={t('login.subtitle')}
          body={t('login.body')}
        />
        <WrapperForm>
          <LoginForm />
          <SettingsWrapper>
            <Settings row position="up" />
          </SettingsWrapper>
        </WrapperForm>
      </Container>
    </Wrapper>
  );
};
