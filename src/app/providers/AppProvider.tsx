import { AppRouter } from '../router';
import { AppContextProvider } from './context';

export const AppProvider = () => {
  return (
        <AppContextProvider>
          <AppRouter />
        </AppContextProvider>
  );
};
