import '../i18n';

import { Provider } from 'react-redux';

import { ThemeProvider } from 'shared/lib/theme';
import { SidebarProvider } from 'widgets/sidebar';

import { AppRouter } from '../router';
import { store } from '../store';
import { BootGate } from './BootGate';
import { ErrorBoundary } from './ErrorBoundary';

export const AppProvider = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <Provider store={store}>
        <SidebarProvider>
          <BootGate>
            <AppRouter />
          </BootGate>
        </SidebarProvider>
      </Provider>
    </ThemeProvider>
  </ErrorBoundary>
);
