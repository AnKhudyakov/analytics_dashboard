import { Meta, StoryObj } from '@storybook/react';
import { formatChannels } from 'pages/Channels/lib/helpers';
import { MemoryRouter } from 'react-router-dom';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Shared/ListItem',
  component: ListItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    items: formatChannels([
      {
        etag: '8-kNABqR9jp8Qrs576Aeeg6vUbo',
        id: 'UCdqp0KK_Io7TwK5cJMBvB0Q',
        snippet: {
          title: 'WhistlinDiesel',
          description: 'Join us for a closer look at Nintendo Switch 2',
          customUrl: '@starwars',
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/0Yzi87lZa_XLsbkrJOC1YRIOS6NWeE9NHO3n8awdpkpLXVApsS2IHCo8D5l8crmpTvZyCYsiAWw=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/0Yzi87lZa_XLsbkrJOC1YRIOS6NWeE9NHO3n8awdpkpLXVApsS2IHCo8D5l8crmpTvZyCYsiAWw=s88-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/0Yzi87lZa_XLsbkrJOC1YRIOS6NWeE9NHO3n8awdpkpLXVApsS2IHCo8D5l8crmpTvZyCYsiAWw=s88-c-k-c0x00ffffff-no-rj',
            },
          },
        },
        statistics: {
          viewCount: '1231086570',
          subscriberCount: '9400000',
          hiddenSubscriberCount: false,
          videoCount: '146',
        },
      },
      {
        etag: 'IiNlHKjUK7Sr6PcgtKrpNIhFjq4',
        id: 'UCbaGn5VkOVlcRgIWAHcrJKA',
        snippet: {
          title: 'Cut',
          customUrl: '@starwars',
          description: 'Join us for a closer look at Nintendo Switch 2',
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/myz3VVBEmgMiHNRZ_YHf1YQxIZjbclajOop-r1fb937YvnD1Dd-eI3cOwlJGhYaub0y4lReD=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/myz3VVBEmgMiHNRZ_YHf1YQxIZjbclajOop-r1fb937YvnD1Dd-eI3cOwlJGhYaub0y4lReD=s88-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/myz3VVBEmgMiHNRZ_YHf1YQxIZjbclajOop-r1fb937YvnD1Dd-eI3cOwlJGhYaub0y4lReD=s88-c-k-c0x00ffffff-no-rj',
            },
          },
          country: 'US',
        },
        statistics: {
          viewCount: '5885428933',
          subscriberCount: '12200000',
          hiddenSubscriberCount: false,
          videoCount: '2362',
        },
      },
      {
        etag: 'k6stIZrR2vPrFsE4aQG1JJW9h24',
        id: 'UCdI8evszfZvyAl2UVCypkTA',
        snippet: {
          title: 'MileyCyrusVEVO',
          customUrl: '@starwars',
          description: 'Join us for a closer look at Nintendo Switch 2',
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/z3AOStrEznwieoK8HCfHi9nNQiPUiycJMEDYwZ5ufnaIS8YQRMj-X8lZpwtMnBsv89kcVUwewA=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/z3AOStrEznwieoK8HCfHi9nNQiPUiycJMEDYwZ5ufnaIS8YQRMj-X8lZpwtMnBsv89kcVUwewA=s88-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/z3AOStrEznwieoK8HCfHi9nNQiPUiycJMEDYwZ5ufnaIS8YQRMj-X8lZpwtMnBsv89kcVUwewA=s88-c-k-c0x00ffffff-no-rj',
            },
          },
        },
        statistics: {
          viewCount: '7243910021',
          subscriberCount: '9980000',
          hiddenSubscriberCount: false,
          videoCount: '146',
        },
      },
      {
        etag: 'wJN-sUtt20nGMgATGcuzIx10RDQ',
        id: 'UCKbNOpmhmwBuJXXMYOg_txA',
        snippet: {
          title: 'GQ Sports',
          customUrl: '@starwars',
          description: 'Join us for a closer look at Nintendo Switch 2',
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/Mio_Ry-JCBLkiFFP8du93kPILw7xVQOq7gsA4hvq_ElkQvjhWkHTQ0EpQXuuE1cChSpXqZw6b48=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/Mio_Ry-JCBLkiFFP8du93kPILw7xVQOq7gsA4hvq_ElkQvjhWkHTQ0EpQXuuE1cChSpXqZw6b48=s88-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/Mio_Ry-JCBLkiFFP8du93kPILw7xVQOq7gsA4hvq_ElkQvjhWkHTQ0EpQXuuE1cChSpXqZw6b48=s88-c-k-c0x00ffffff-no-rj',
            },
          },

          country: 'US',
        },
        statistics: {
          viewCount: '735106428',
          subscriberCount: '1570000',
          hiddenSubscriberCount: false,
          videoCount: '792',
        },
      },
    ]).items,
  },
};

export const Empty: Story = {
  args: {
    items: formatChannels([]).items,
  },
};
