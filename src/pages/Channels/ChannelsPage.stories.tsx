import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { store } from 'app/store/store';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';
import { ChannelsPage } from './ChannelsPage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof ChannelsPage> = {
  title: 'Pages/ChannelsPage',
  component: ChannelsPage,
  parameters: {
    // msw: {
    //   handlers: [
    //     http.get('/api/trending-videos', async () => {
    //       return HttpResponse.json({
    //         items: [
    //           {
    //             id: '1',
    //             snippet: { channelId: 'abc', title: 'Trending Video 1' },
    //           },
    //           {
    //             id: '2',
    //             snippet: { channelId: 'xyz', title: 'Trending Video 2' },
    //           },
    //         ],
    //         nextPageToken: 'nextPage',
    //         prevPageToken: 'prevPage',
    //         pageInfo: { totalResults: 20 },
    //       });
    //     }),
    //     http.get('/api/channels', async () => {
    //       return HttpResponse.json({
    //         items: [
    //           {
    //             id: 'abc',
    //             snippet: { title: 'Channel 1' },
    //             statistics: { subscriberCount: '1000' },
    //           },
    //           {
    //             id: 'xyz',
    //             snippet: { title: 'Channel 2' },
    //             statistics: { subscriberCount: '500' },
    //           },
    //         ],
    //         pageInfo: { totalResults: 2 },
    //       });
    //     }),
    //   ],
    // },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
      <Provider store={store}>
        <Story />
      </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChannelsPage>;

export const Default: Story = {};

// TODO activate
// export const WithSearch: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     const searchInput = await canvas.getByPlaceholderText('Search for...');
//     await userEvent.type(searchInput, 'Tech Channels', { delay: 100 });
//   },
// };
