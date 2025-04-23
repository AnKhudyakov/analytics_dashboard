import React from 'react';
import { config } from 'shared/config';
import { Card } from 'shared/ui/components/Card';
import { Typography } from 'shared/ui/components/Typography';
import { ChannelCardProps } from './ChannelCard.def';
import {
  Avatar,
  Banner,
  BannerWrapper,
  Container,
  InfoWrapper,
  TitleLink,
} from './ChannelCard.styles';

export const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  description,
  avatar,
  banner,
  customUrl,
}) => {
  return (
    <Card flex className='flex-col sm:flex-row'>
      {banner && (
        <BannerWrapper>
          <Banner
            src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(banner)}`}
            alt="Banner"
          />
        </BannerWrapper>
      )}
      <Container>
        <InfoWrapper>
          <Avatar
            src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(avatar)}`}
            alt={title}
          />
          <div>
            <TitleLink
              href={`https://www.youtube.com/${customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="subtitle">{title}</Typography>
            </TitleLink>
            <Typography variant="body" className="line-clamp-3 sm:line-clamp-7 break-all sm:break-words">
              {description}
            </Typography>
          </div>
        </InfoWrapper>
      </Container>
    </Card>
  );
};
