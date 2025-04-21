import { SingupForm } from 'features/auth/ui/SingupForm';
import { WelcomeTitle } from 'shared/ui/components/WelcomeTitle/WelcomeTitle';
import { Container, Wrapper } from './SignupPage.styles';

export const SignupPage = () => {
  return (
    <Wrapper>
      <Container>
        <WelcomeTitle
          title="Roll the Carpet! "
          body="Signup your account to continue"
        />
        <SingupForm />
      </Container>
    </Wrapper>
  );
};
