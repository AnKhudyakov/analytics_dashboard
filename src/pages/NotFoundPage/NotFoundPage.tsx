import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/components/Button';
import { Typography } from 'shared/ui/components/Typography';
import { Container, Content } from './NotFoundPage.styles';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Content>
        <Typography variant="subtitle">
          Oops! We couldn’t find that page.
        </Typography>
        <Typography variant="body">
          It looks like the page you’re trying to reach doesn’t exist. Maybe
          check the URL or go back to the homepage.
        </Typography>
        <Button onClick={() => navigate('/channels')}>Home</Button>
      </Content>
    </Container>
  );
};
