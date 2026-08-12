import { config } from 'shared/config';

export const proxiedImageUrl = (url: string): string =>
  `${config.backendUrl}/proxy-image?url=${encodeURIComponent(url)}`;
