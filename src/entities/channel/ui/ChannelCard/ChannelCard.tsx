import { type FC } from 'react';

import { proxiedImageUrl } from 'shared/lib/images';
import { Card } from 'shared/ui/Card';
import { LazyImage } from 'shared/ui/LazyImage';
import { Typography } from 'shared/ui/Typography';

import { type ChannelAnalytics } from '../../model/types';
import {
  BannerWrapper,
  Container,
  InfoWrapper,
  TitleLink,
} from './ChannelCard.styles';

export interface ChannelCardProps {
  channel: ChannelAnalytics;
}

export const ChannelCard: FC<ChannelCardProps> = ({ channel }) => {
  const { snippet, brandingSettings } = channel;
  const banner = brandingSettings?.image?.bannerExternalUrl;
  const avatar = snippet.thumbnails.high.url;

  return (
    <Card flex className="flex-col sm:flex-row">
      {banner && (
        <BannerWrapper>
          <LazyImage src={proxiedImageUrl(banner)} alt="" />
        </BannerWrapper>
      )}
      <Container>
        <InfoWrapper>
          <LazyImage
            src={proxiedImageUrl(avatar)}
            alt=""
            className="h-16 w-16 shrink-0 rounded-full border border-secondary-1"
          />
          <div>
            {snippet.customUrl ? (
              <TitleLink
                href={`https://www.youtube.com/${snippet.customUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography variant="subtitle">{snippet.title}</Typography>
              </TitleLink>
            ) : (
              <Typography variant="subtitle">{snippet.title}</Typography>
            )}
            <Typography
              variant="body"
              className="line-clamp-3 break-all sm:line-clamp-7 sm:break-words"
            >
              {snippet.description}
            </Typography>
          </div>
        </InfoWrapper>
      </Container>
    </Card>
  );
};
