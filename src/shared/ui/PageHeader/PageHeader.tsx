import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from 'shared/ui/Input';
import { Typography } from 'shared/ui/Typography';

import { Container, Header } from './PageHeader.styles';

export interface PageHeaderProps {
  title: string;
  search: string;
  onSearchChange: (search: string) => void;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  search,
  onSearchChange,
}) => {
  const { t } = useTranslation();

  return (
    <Header>
      <Typography variant="title">{title}</Typography>
      <Container>
        <Input
          type="search"
          label={t('shared.search')}
          placeholder={t('shared.search')}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          search
        />
      </Container>
    </Header>
  );
};
