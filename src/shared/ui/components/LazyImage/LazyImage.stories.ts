import { Meta, StoryObj } from '@storybook/react';
import { config } from 'shared/config';
import { LazyImage } from './LazyImage';

const meta: Meta<typeof LazyImage> = {
  title: 'Shared/LazyImage',
  component: LazyImage,
  args: {
    src: `${config.backendUrl}/proxy-image?url=${encodeURIComponent('https://yt3.ggpht.com/KOsbt2apN-kIlhUUE5SDLyX1iZw_zbLpcG3JqltSazhKa6zAisrAk7HqGfYIXjaUCjIEXzdoaw=s88-c-k-c0x00ffffff-no-rj')}`,
    alt: 'Banner',
    skeletonHeight: 10,
    skeletonWidth: 10
  },
};

export default meta;
type Story = StoryObj<typeof LazyImage>;

export const Default: Story = {};
