import { LoginForm } from 'features/auth/ui/LoginForm';
import { WelcomeTitle } from 'shared/ui/components/WelcomeTitle/WelcomeTitle';
import { Container, Wrapper } from './LoginPage.styles';

export const LoginPage = () => {
  return (
    <Wrapper>
      <Container>
        <WelcomeTitle
          title="Welcome to"
          subtitle="Analytics Dashboard"
          body="Login in to your account to continue"
        />
        <LoginForm />
      </Container>
    </Wrapper>
  );
};
