export interface ChannelStats {
  id: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

export interface MetricsCardsProps {
  stats: ChannelStats[];
}
