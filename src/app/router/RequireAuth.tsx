import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from 'features/auth';
import { routerPaths } from 'shared/constants';

import { useAppSelector } from '../store/hooks';

export const RequireAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={routerPaths.LOGIN} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};
