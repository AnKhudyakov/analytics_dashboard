export interface Snippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  tags: string[];
  thumbnails: {
    default: { url: string };
  };
  title: string;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
