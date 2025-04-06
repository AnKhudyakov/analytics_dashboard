import { ChangeEvent, FC } from 'react';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { PageHeaderProps } from './PageHeader.def';
import { Header } from './PageHeader.styles';

export const PageHeader: FC<PageHeaderProps> = ({
  content,
  setSearch,
}) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (!search) return;
    setSearch(search);
  };

  return (
    <Header>
      <Typography variant="title">{content}</Typography>
      <div className="max-w-350">
        <Input onChange={handleSearch} search/>
      </div>
    </Header>
  );
};
