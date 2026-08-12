import '../src/app/i18n';
import '../src/app/styles/index.css';
import './preview.css';

import type { Decorator, Preview } from '@storybook/react';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'light' ? 'light' : 'dark';
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  root.style.colorScheme = theme;

  return (
    <div className="bg-primary p-4 text-base-font">
      <Story />
    </div>
  );
};

export const decorators = [withTheme];

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'dark',
      toolbar: { icon: 'mirror', items: ['light', 'dark'], showName: true },
    },
  },
};

export default preview;
