import type { Preview } from '@storybook/react';
import '../src/app/styles/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: 'var(--color-primary-light)' },
        { name: 'dark', value: 'var(--color-primary-dark)' },
      ],
    },
  },
};

export default preview;
