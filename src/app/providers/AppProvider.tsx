import { store } from 'app/store/store';
import { Provider } from 'react-redux';
import { AppRouter } from '../router';
import { AppContextProvider } from './context';

export const AppProvider = () => {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppContextProvider>
  );
};
