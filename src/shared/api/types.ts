export interface Thumbnail {
  url: string;
  width?: number;
  height?: number;
}

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

export interface PaginatedResponse<T> {
  items: T[];
  prevPageToken?: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
}

export type SortOrder = 'asc' | 'desc';

export interface RangeValue {
  valueFrom?: number;
  valueTo?: number;
}

export interface Filter {
  filterType: 'range' | 'checkbox';
  filterValue: boolean | RangeValue;
}

export type Filters = Record<string, Filter | null>;

export interface ResourceQuery {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
  search: string;
  filters: Filters;
}
