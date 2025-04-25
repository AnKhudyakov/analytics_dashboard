import { SingupForm } from 'features/auth/ui/SingupForm';
import { useTranslation } from 'react-i18next';
import { WelcomeTitle } from 'shared/ui/components/WelcomeTitle/WelcomeTitle';
import { Container, Wrapper } from './SignupPage.styles';

export const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Container>
        <WelcomeTitle title={t('singup.title')} body={t('singup.body')} />
        <SingupForm />
      </Container>
    </Wrapper>
  );
};
