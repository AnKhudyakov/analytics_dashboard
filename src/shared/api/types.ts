export interface Snippet {
  title: string;
  description: string;
  customUrl?: string;
  publishedAt?: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  localized?: {
    title: string;
    description: string;
  };
  categoryId?: string;
  channelId?: string;
  id?: string;
  channelTitle?: string;
  country?: string;
  tags?: string[];
  liveBroadcastContent?: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface Filters extends Record<string, Filter | null> {}

export interface Filter {
  filterType?: 'range' | 'checkbox';
  filterValue?: boolean | RangeValue;
}

export interface RangeValue {
  valueFrom?: number;
  valueTo?: number;
}

export interface Login {
  username: string;
  password: string;
}

export interface Signup {
  username: string;
  email: string;
  password: string;
}
