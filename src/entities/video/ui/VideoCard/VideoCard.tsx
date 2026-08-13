import { type FC } from 'react';

import { proxiedImageUrl } from 'shared/lib/images';
import { Card } from 'shared/ui/Card';
import { LazyImage } from 'shared/ui/LazyImage';
import { Typography } from 'shared/ui/Typography';

import { type Video } from '../../model/types';
import {
  BannerWrapper,
  Container,
  InfoWrapper,
  TitleLink,
} from './VideoCard.styles';

export interface VideoCardProps {
  video: Video;
}

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const { snippet, id } = video;
  const banner = snippet.thumbnails.high.url;

  return (
    <Card flex className="flex-col sm:flex-row">
      <BannerWrapper>
        <LazyImage src={proxiedImageUrl(banner)} alt="" />
      </BannerWrapper>
      <Container>
        <InfoWrapper>
          <div>
            <TitleLink
              href={`https://www.youtube.com/watch?v=${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography variant="subtitle" className="pr-20">
                {snippet.title}
              </Typography>
            </TitleLink>
            <Typography
              variant="body"
              className="line-clamp-3 break-all sm:line-clamp-6 sm:break-words"
            >
              {snippet.description}
            </Typography>
          </div>
        </InfoWrapper>
      </Container>
    </Card>
  );
};
