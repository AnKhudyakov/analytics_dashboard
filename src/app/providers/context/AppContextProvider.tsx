import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'shared/context/ThemeContext';

interface AppContextProviderProps extends PropsWithChildren {}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
