import 'app/i18n';

import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactElement, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { type AppStore, createAppStore } from 'app/store';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', store = createAppStore(), ...options }: Options = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </Provider>
  );

  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};
