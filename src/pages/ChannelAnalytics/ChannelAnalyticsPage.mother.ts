import { ChannelAnalyticsResponse } from 'entities/channel/model/types';

export const channelAnatytics: ChannelAnalyticsResponse = {
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: 'youtube#channel',
      etag: 'tJE_92nc4S4XdbU54cAj0ouaHdk',
      id: 'UCK7tptUDHh-RYDsdxO1-5QQ',
      snippet: {
        title: 'The Wall Street Journal',
        description:
          'The Wall Street Journal takes you inside carefully selected stories and events in a visually captivating way so you can dig deeper into the news and insights that matter to you. ',
        customUrl: '@wsj',
        publishedAt: '2007-06-18T18:06:47Z',
        thumbnails: {
          default: {
            url: 'https://yt3.ggpht.com/zbPzRWTIiIg_sNPoAgBf4COWvAoac3vgbiTEu1dfpqH3YPDNvnxMjDtAGftuw5EPx8wfSjMzr2I=s88-c-k-c0x00ffffff-no-rj',
            width: 88,
            height: 88,
          },
          medium: {
            url: 'https://yt3.ggpht.com/zbPzRWTIiIg_sNPoAgBf4COWvAoac3vgbiTEu1dfpqH3YPDNvnxMjDtAGftuw5EPx8wfSjMzr2I=s240-c-k-c0x00ffffff-no-rj',
            width: 240,
            height: 240,
          },
          high: {
            url: 'https://yt3.ggpht.com/zbPzRWTIiIg_sNPoAgBf4COWvAoac3vgbiTEu1dfpqH3YPDNvnxMjDtAGftuw5EPx8wfSjMzr2I=s800-c-k-c0x00ffffff-no-rj',
            width: 800,
            height: 800,
          },
        },
        localized: {
          title: 'The Wall Street Journal',
          description:
            'The Wall Street Journal takes you inside carefully selected stories and events in a visually captivating way so you can dig deeper into the news and insights that matter to you. ',
        },
        country: 'US',
      },
      contentDetails: {
        relatedPlaylists: {
          likes: '',
          uploads: 'UUK7tptUDHh-RYDsdxO1-5QQ',
        },
      },
      statistics: {
        viewCount: '2241735651',
        subscriberCount: '6090000',
        hiddenSubscriberCount: false,
        videoCount: '28153',
      },
      topicDetails: {
        topicIds: ['/m/05qt0', '/m/098wr'],
        topicCategories: [
          'https://en.wikipedia.org/wiki/Politics',
          'https://en.wikipedia.org/wiki/Society',
        ],
      },
      status: {
        privacyStatus: 'public',
        isLinked: true,
        longUploadsStatus: 'longUploadsUnspecified',
        madeForKids: false,
      },
      brandingSettings: {
        channel: {
          title: 'The Wall Street Journal',
          description:
            'The Wall Street Journal takes you inside carefully selected stories and events in a visually captivating way so you can dig deeper into the news and insights that matter to you. ',
          keywords:
            'WSJ Wall Street Journal Financial News Politics "Wall Street Journal" Business "The Wall Street Journal" Markets Economy Tech Economics Markets "Stock Market" Technology Automobiles "Car Market" EVs AI Geopolitics "Supply Chain" Logistics Space War Companies Military Finance World "World News" "U.S. News" Airlines Entrepreneurship Elections "Central Banking" Housing Jobs Trade "Personal Finance" "Real Estate" Policy "National Security" Science Media Climate Environment Education Law Regulation',
          unsubscribedTrailer: 'vW6soMIVvMA',
          country: 'US',
        },
        image: {
          bannerExternalUrl:
            'https://yt3.googleusercontent.com/CZ6xmzxkOUkvdSGFR4xmEX0DJB6iEy8lDXHLgpShIhTmDd0ZD6q3x2sMEi85BjaLPIN2x816',
        },
      },
      contentOwnerDetails: {},
    },
  ],
};
