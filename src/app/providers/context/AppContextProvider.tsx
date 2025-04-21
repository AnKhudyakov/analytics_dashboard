import React, { PropsWithChildren } from 'react';

interface AppContextProviderProps extends PropsWithChildren {}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return <>{children}</>;
};
