import { ChangeEvent, FC } from 'react';
import { Input } from 'shared/ui/components/Input';
import { Typography } from 'shared/ui/components/Typography';
import { AnalyticsHeaderProps } from './ChannelsHeader.def';
import { Header } from './ChannelsHeader.styles';

export const ChannelsHeader: FC<AnalyticsHeaderProps> = ({
  content,
  search,
  setSearch,
}) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearch(search);
  };

  return (
    <Header>
      <Typography variant="title">{content}</Typography>
      <div className="max-w-350">
        <Input value={search} onChange={handleSearch} search />
      </div>
    </Header>
  );
};
