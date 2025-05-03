import React, { PropsWithChildren } from 'react';
import { CollapsedProvider } from 'shared/context/CollapsedContext';
import { ThemeProvider } from 'shared/context/ThemeContext';

interface AppContextProviderProps extends PropsWithChildren {}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <CollapsedProvider>{children} </CollapsedProvider>
    </ThemeProvider>
  );
};
