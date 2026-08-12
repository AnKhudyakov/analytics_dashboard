import { useTranslation } from 'react-i18next';

import { routerPaths } from 'shared/constants';
import { Typography } from 'shared/ui/Typography';

import { Container, Content, HomeLink } from './NotFoundPage.styles';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Content>
        <Typography variant="subtitle">{t('notFound.subtitle')}</Typography>
        <Typography variant="body">{t('notFound.body')}</Typography>
        <HomeLink to={routerPaths.CHANNELS}>{t('notFound.home')}</HomeLink>
      </Content>
    </Container>
  );
};
