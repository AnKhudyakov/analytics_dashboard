import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/components/Button';
import { Typography } from 'shared/ui/components/Typography';
import { Container, Content } from './NotFoundPage.styles';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container>
      <Content>
        <Typography variant="subtitle">{t('notFound.subtitle')}</Typography>
        <Typography variant="body">{t('notFound.body')}</Typography>
        <Button onClick={() => navigate('/channels')}>{t('notFound.home')}</Button>
      </Content>
    </Container>
  );
};
