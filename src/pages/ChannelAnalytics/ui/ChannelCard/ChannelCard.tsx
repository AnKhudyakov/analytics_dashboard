import React from 'react';
import { config } from 'shared/config';
import { Card } from 'shared/ui/components/Card';
import { LazyImage } from 'shared/ui/components/LazyImage/LazyImage';
import { Typography } from 'shared/ui/components/Typography';
import { ChannelCardProps } from './ChannelCard.def';
import {
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
    <Card flex className="flex-col sm:flex-row">
      {banner && (
        <BannerWrapper>
          <LazyImage
            skeletonHeight={278}
            src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(banner)}`}
            alt="Banner"
            className="rounded-t-lg sm:rounded-t-none sm:rounded-l-lg"
          />
        </BannerWrapper>
      )}
      <Container>
        <InfoWrapper>
          {avatar && (
            <LazyImage
              skeletonHeight="4rem"
              skeletonWidth="4rem"
              borderRadius="50%"
              src={`${config.backendUrl}/proxy-image?url=${encodeURIComponent(avatar)}`}
              alt={title}
              className="w-16 h-16 rounded-full border border-secondary-1"
            />
          )}
          <div>
            <TitleLink
              href={`https://www.youtube.com/${customUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="subtitle">{title}</Typography>
            </TitleLink>
            <Typography
              variant="body"
              className="line-clamp-3 sm:line-clamp-7 break-all sm:break-words"
            >
              {description}
            </Typography>
          </div>
        </InfoWrapper>
      </Container>
    </Card>
  );
};
