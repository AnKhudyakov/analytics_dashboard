import { LoginForm } from 'features/auth/ui/LoginForm';
import { useTranslation } from 'react-i18next';
import { WelcomeTitle } from 'shared/ui/components/WelcomeTitle/WelcomeTitle';
import { Container, Wrapper } from './LoginPage.styles';

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
        <LoginForm />
      </Container>
    </Wrapper>
  );
};
