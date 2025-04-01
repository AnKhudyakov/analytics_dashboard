import { FC } from 'react';
import { MetricsCardsProps } from './MetricsCards.def';
import {
  Card,
  CardsContainer,
  CardTitle,
  CardValue,
} from './MetricsCards.styles';

export const MetricsCards: FC<MetricsCardsProps> = ({ stats }) => {
  const totalSubscribers = stats.reduce(
    (sum, stat) => sum + Number(stat.subscriberCount),
    0
  );
  const totalViews = stats.reduce(
    (sum, stat) => sum + Number(stat.viewCount),
    0
  );
  const totalVideos = stats.reduce(
    (sum, stat) => sum + Number(stat.videoCount),
    0
  );

  return (
    <CardsContainer>
      <Card>
        <CardTitle>Всего подписчиков</CardTitle>
        <CardValue>{totalSubscribers.toLocaleString()}</CardValue>
      </Card>
      <Card>
        <CardTitle>Всего просмотров</CardTitle>
        <CardValue>{totalViews.toLocaleString()}</CardValue>
      </Card>
      <Card>
        <CardTitle>Всего видео</CardTitle>
        <CardValue>{totalVideos.toLocaleString()}</CardValue>
      </Card>
    </CardsContainer>
  );
};
