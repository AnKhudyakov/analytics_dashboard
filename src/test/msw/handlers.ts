import { http, HttpResponse } from 'msw';

import { type Channel } from 'entities/channel';
import { type Video } from 'entities/video';
import { config } from 'shared/config';

const API_URL = config.backendUrl;

const base64Url = (value: object) =>
  btoa(JSON.stringify(value))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');

export const makeToken = (expiresInSeconds = 3600) =>
  [
    base64Url({ alg: 'HS256', typ: 'JWT' }),
    base64Url({ exp: Math.floor(Date.now() / 1000) + expiresInSeconds }),
    'signature',
  ].join('.');

export const makeChannel = (overrides: Partial<Channel> = {}): Channel => ({
  id: 'channel-1',
  snippet: {
    title: 'First channel',
    description: 'Description',
    thumbnails: {
      default: { url: 'https://example.test/default.jpg' },
      medium: { url: 'https://example.test/medium.jpg' },
      high: { url: 'https://example.test/high.jpg' },
    },
  },
  statistics: {
    subscriberCount: 1200,
    viewCount: 2_500_000,
    hiddenSubscriberCount: false,
    videoCount: 42,
  },
  stats: [],
  ...overrides,
});

export const makeVideo = (overrides: Partial<Video> = {}): Video => ({
  id: 'video-1',
  snippet: {
    title: 'First video',
    description: 'Description',
    thumbnails: {
      default: { url: 'https://example.test/default.jpg' },
      medium: { url: 'https://example.test/medium.jpg' },
      high: { url: 'https://example.test/high.jpg' },
    },
  },
  statistics: {
    favoriteCount: 1,
    viewCount: 900,
    commentCount: 12,
    likeCount: 34,
  },
  stats: [],
  ...overrides,
});

export const CHANNELS = [
  makeChannel(),
  makeChannel({
    id: 'channel-2',
    snippet: {
      title: 'Second channel',
      description: 'Description',
      thumbnails: {
        default: { url: 'https://example.test/default2.jpg' },
        medium: { url: 'https://example.test/medium2.jpg' },
        high: { url: 'https://example.test/high2.jpg' },
      },
    },
    statistics: {
      subscriberCount: 5_400_000,
      viewCount: 12_000,
      hiddenSubscriberCount: true,
      videoCount: 7,
    },
  }),
];

export const handlers = [
  http.get(`${API_URL}/channels`, () =>
    HttpResponse.json({
      items: CHANNELS,
      pageInfo: { totalResults: CHANNELS.length, resultsPerPage: 10 },
    })
  ),
  http.get(`${API_URL}/channels/search`, ({ request }) => {
    const search = new URL(request.url).searchParams.get('search') ?? '';
    const items = CHANNELS.filter((channel) =>
      channel.snippet.title.toLowerCase().includes(search.toLowerCase())
    );
    return HttpResponse.json({
      items,
      pageInfo: { totalResults: items.length, resultsPerPage: 10 },
    });
  }),
  http.get(`${API_URL}/videos`, () =>
    HttpResponse.json({
      items: [makeVideo()],
      pageInfo: { totalResults: 1, resultsPerPage: 10 },
    })
  ),
  http.get(`${API_URL}/auth/providers`, () =>
    HttpResponse.json({ google: false, linkedin: false, facebook: false })
  ),
  http.post(`${API_URL}/login`, async ({ request }) => {
    const body = (await request.json()) as { username?: string };
    if (body.username !== 'demo') {
      return HttpResponse.json({ message: 'Invalid' }, { status: 401 });
    }
    return HttpResponse.json({ token: makeToken() });
  }),
];
