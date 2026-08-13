export type CompareMetric =
  | 'subscriberCount'
  | 'viewCount'
  | 'videoCount'
  | 'estimatedRevenueUsd';

export interface ComparePoint {
  date: string;
  [channelId: string]: string | number;
}

export interface CompareResponse {
  metric: CompareMetric;
  channels: { id: string; title: string }[];
  points: ComparePoint[];
}

export interface InsightsSummary {
  totals: {
    channels: number;
    subscribers: number;
    views: number;
    videos: number;
    trackedVideos: number;
    likes: number;
    comments: number;
    estimatedRevenueUsd: number;
  };
  weekdayActivity: {
    dayOfWeek: string;
    viewDelta: number;
    subscriberDelta: number;
    revenue: number;
  }[];
}

export interface CategoryInsight {
  categoryId: string;
  name: string;
  videos: number;
  views: number;
  likes: number;
  comments: number;
}

export interface CountryInsight {
  country: string;
  channels: number;
  subscribers: number;
  views: number;
}
