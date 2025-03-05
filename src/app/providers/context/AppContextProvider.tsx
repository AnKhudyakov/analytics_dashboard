import React, { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

export const AppContextProvider: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};
