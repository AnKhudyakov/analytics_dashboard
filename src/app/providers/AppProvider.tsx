import '../i18n';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'shared/lib/theme';
import { SidebarProvider } from 'widgets/sidebar';

import { AppRouter } from '../router';
import { store } from '../store';
import { ErrorBoundary } from './ErrorBoundary';

export const AppProvider = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Provider store={store}>
        <SidebarProvider>
          <AppRouter />
        </SidebarProvider>
      </Provider>
    </ThemeProvider>
  </ErrorBoundary>
);
