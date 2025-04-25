import { AppLayout } from 'app/providers/layout';
import { ChannelAnalyticsPage } from 'pages/ChannelAnalytics/ChannelAnalyticsPage';
import { ChannelsPage } from 'pages/Channels';
import { LoginPage } from 'pages/Login';
import { NotFoundPage } from 'pages/NotFound';
import { SignupPage } from 'pages/Signup';
import { VideosPage } from 'pages/Videos';
import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { routerPaths } from 'shared/constants';
import { isAuthenticated } from 'shared/lib/helpers';

interface AppRouterProps {}

export const PrivateRoute = () => {
  return isAuthenticated() ? <AppLayout /> : <Navigate to="/login" />;
};

const routes = createRoutesFromElements(
  <>
    <Route path={routerPaths.LOGIN_PATH} element={<LoginPage />} />
    <Route path={routerPaths.SIGNUP_PATH} element={<SignupPage />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route path={routerPaths.MAIN_PATH} element={<PrivateRoute />}>
      <Route
        index
        element={<Navigate to={routerPaths.CHANNELS_PATH} replace />}
      />
      <Route path={routerPaths.CHANNELS_PATH} element={<ChannelsPage />} />
      <Route
        path={routerPaths.CHANNEL_PATH}
        element={<ChannelAnalyticsPage />}
      />
      <Route path={routerPaths.VIDEOS_PATH} element={<VideosPage />} />
    </Route>
  </>
);

export const AppRouter: React.FC<AppRouterProps> = () => {
  const router = createHashRouter(routes, {});

  return <RouterProvider router={router} />;
};
