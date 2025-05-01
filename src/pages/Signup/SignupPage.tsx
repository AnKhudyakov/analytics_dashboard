import { SingupForm } from 'features/auth/ui/SingupForm';
import { useTranslation } from 'react-i18next';
import { WelcomeTitle } from 'shared/ui/components/WelcomeTitle/WelcomeTitle';
import { Settings } from 'widgets/settings';
import { Container, Wrapper, WrapperForm } from './SignupPage.styles';

export const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Container>
        <WelcomeTitle title={t('singup.title')} body={t('singup.body')} />
        <WrapperForm>
          <Settings />
          <SingupForm />
        </WrapperForm>
      </Container>
    </Wrapper>
  );
};
