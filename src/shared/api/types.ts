export interface Snippet {
  categoryId?: string;
  channelId?: string;
  channelTitle?: string;
  thumbnails: {
    default: { url: string };
  };
  title: string;
  country?: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
