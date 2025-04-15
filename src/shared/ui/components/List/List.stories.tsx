import { Meta, StoryObj } from '@storybook/react';
import { formatChannels } from 'pages/Channels/lib/helpers';
import { MemoryRouter } from 'react-router-dom';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Shared/List',
  component: List,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    data: formatChannels([
      {
        snippet: {
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/XzHYAV8TQJrS9_WrRNWkIOYkkO9dQEfpwoqq3SkRALzuuBKLI9mKTIfHhuWypyI9fqPVR7Wm=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/XzHYAV8TQJrS9_WrRNWkIOYkkO9dQEfpwoqq3SkRALzuuBKLI9mKTIfHhuWypyI9fqPVR7Wm=s240-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/XzHYAV8TQJrS9_WrRNWkIOYkkO9dQEfpwoqq3SkRALzuuBKLI9mKTIfHhuWypyI9fqPVR7Wm=s800-c-k-c0x00ffffff-no-rj',
            },
          },
          title: 'ACG',
          description:
            'https://www.youtube.com/channel/UCK9_x1DImhU-eolIay5rb2Q/?sub_confirmation=1\nI try to create the best, most accurate video game reviews for video games on youtube.\nWalking the Walk game critiques, video game reviews, video game previews, developer round tables, weekly game news website https://www.acgamer.net/\nhttps://opencritic.com/outlet/310/acg\nHome to the best gaming podcast.\n\nAngryCentaurGaming or ACG and Karak running it, is a popular YouTube channel focused on providing high-quality gaming content and reviews. With over 1.2m subscribers and a strong presence in the gaming community, the channel has gained a reputation for in-depth analysis and entertaining personality thorough and analytical approach to reviewing games..\nSome of the key gaming videos include:\n- Game reviews\n- Gaming news\n- Gaming commentary\n- Gaming opinion pieces\n- Expert analysis\nhttps://teespring.com/stores/acg\nhttps://www.patreon.com/AngryCentaurGaming \nThe Best Videogame review channel on youtube \n',
        },
        statistics: {
          viewCount: 208187467,
          subscriberCount: 1210000,
          videoCount: 1515,
          hiddenSubscriberCount: false,
        },
        stats: [],
        id: 'UCK9_x1DImhU-eolIay5rb2Q',
      },
      {
        snippet: {
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/vLWO1tajYHyFJ3lGkcMxKMayA-ZNUqCUYj5bOO8TWhNVL7EV-bjxmguUkZ3B2dMsAtZYir8r=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/vLWO1tajYHyFJ3lGkcMxKMayA-ZNUqCUYj5bOO8TWhNVL7EV-bjxmguUkZ3B2dMsAtZYir8r=s240-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/vLWO1tajYHyFJ3lGkcMxKMayA-ZNUqCUYj5bOO8TWhNVL7EV-bjxmguUkZ3B2dMsAtZYir8r=s800-c-k-c0x00ffffff-no-rj',
            },
          },
          title: 'Ariana Grande - Topic',
          description: '',
        },
        statistics: {
          viewCount: 4511822685,
          subscriberCount: 394000,
          videoCount: 1221,
          hiddenSubscriberCount: false,
        },
        stats: [],
        id: 'UC0076UMUgEng8HORUw_MYHA',
      },
      {
        snippet: {
          thumbnails: {
            default: {
              url: 'https://yt3.ggpht.com/1BC_7gkxYihrtRMjahs_YF0tDizM5pARExKwHYyeOqZ0VMRxmu9sBURcYYa5FA4n_qJF_KluKQ=s88-c-k-c0x00ffffff-no-rj',
            },
            medium: {
              url: 'https://yt3.ggpht.com/1BC_7gkxYihrtRMjahs_YF0tDizM5pARExKwHYyeOqZ0VMRxmu9sBURcYYa5FA4n_qJF_KluKQ=s240-c-k-c0x00ffffff-no-rj',
            },
            high: {
              url: 'https://yt3.ggpht.com/1BC_7gkxYihrtRMjahs_YF0tDizM5pARExKwHYyeOqZ0VMRxmu9sBURcYYa5FA4n_qJF_KluKQ=s800-c-k-c0x00ffffff-no-rj',
            },
          },
          title: 'BLOKEST',
          description:
            'professional lego set dropper 🔥, certified lego brick layer 🥶. I want to make the most fun and engaging LEGO videos possible.\n\nbusiness email: blokest@delkatalents.com\n',
        },
        statistics: {
          viewCount: 86698855,
          subscriberCount: 430000,
          videoCount: 66,
          hiddenSubscriberCount: false,
        },
        stats: [],
        id: 'UCkYmTGlYylzEtKbr42e8OfA',
      },
    ]),
    isLoading: false,
    emptyText: '',
    viewPath: '',
    onSort: () => {},
    onFilter: () => {},
  },
};

export const Loading: Story = {
  args: {
    data: formatChannels([]),
    isLoading: true,
    emptyText: 'No items found',
  },
};

export const Empty: Story = {
  args: {
    data: formatChannels([]),
    emptyText: 'No items found',
  },
};
