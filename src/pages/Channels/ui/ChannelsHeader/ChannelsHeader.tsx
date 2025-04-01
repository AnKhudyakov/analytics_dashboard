import { FC } from 'react';
import { Search } from 'shared/ui/components/Search';
import { AnalyticsHeaderProps } from './ChannelsHeader.def';
import { Header } from './ChannelsHeader.styles';
import { Typography } from 'shared/ui/components/Typography';

export const ChannelsHeader: FC<AnalyticsHeaderProps> = ({ content }) => {
  return (
    <Header>
      <Typography variant='title'>{content}</Typography>
      <div className="max-w-350">
        <Search />
      </div>
    </Header>
  );
};
