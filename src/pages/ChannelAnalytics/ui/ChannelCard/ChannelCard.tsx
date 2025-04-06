import React from 'react';
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
import { config } from 'shared/config';

export const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  description,
  avatar,
  banner,
  customUrl,
}) => {
  return (
    <Card flex>
      {banner && (
        <BannerWrapper>
          <Banner src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(banner)}`} alt="Banner" />
        </BannerWrapper>
      )}
      <Container>
        <InfoWrapper>
          <Avatar src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(avatar)}`} alt={title} />
          <div>
            <TitleLink
              href={`https://www.youtube.com/${customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="subtitle">{title}</Typography>
            </TitleLink>
            <Typography variant="body">{description}</Typography>
          </div>
        </InfoWrapper>
      </Container>
    </Card>
  );
};
