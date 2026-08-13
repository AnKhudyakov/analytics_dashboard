import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';

import { routerPaths } from 'shared/constants';

import { AppLayout } from '../layouts/AppLayout';
import { RequireAuth } from './RequireAuth';

const ChannelsPage = lazy(() =>
  import('pages/channels').then((module) => ({ default: module.ChannelsPage }))
);
const ChannelAnalyticsPage = lazy(() =>
  import('pages/channel-analytics').then((module) => ({
    default: module.ChannelAnalyticsPage,
  }))
);
const VideosPage = lazy(() =>
  import('pages/videos').then((module) => ({ default: module.VideosPage }))
);
const VideoAnalyticsPage = lazy(() =>
  import('pages/video-analytics').then((module) => ({
    default: module.VideoAnalyticsPage,
  }))
);
const LoginPage = lazy(() =>
  import('pages/login').then((module) => ({ default: module.LoginPage }))
);
const SignupPage = lazy(() =>
  import('pages/signup').then((module) => ({ default: module.SignupPage }))
);
const OverviewPage = lazy(() =>
  import('pages/overview').then((module) => ({ default: module.OverviewPage }))
);
const ComparePage = lazy(() =>
  import('pages/compare').then((module) => ({ default: module.ComparePage }))
);
const ProfilePage = lazy(() =>
  import('pages/profile').then((module) => ({ default: module.ProfilePage }))
);
const NotFoundPage = lazy(() =>
  import('pages/not-found').then((module) => ({ default: module.NotFoundPage }))
);

export const router = createHashRouter([
  { path: routerPaths.LOGIN, element: <LoginPage /> },
  { path: routerPaths.SIGNUP, element: <SignupPage /> },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: routerPaths.MAIN,
            element: <Navigate to={routerPaths.OVERVIEW} replace />,
          },
          { path: routerPaths.OVERVIEW, element: <OverviewPage /> },
          { path: routerPaths.COMPARE, element: <ComparePage /> },
          { path: routerPaths.CHANNELS, element: <ChannelsPage /> },
          { path: routerPaths.CHANNEL, element: <ChannelAnalyticsPage /> },
          { path: routerPaths.VIDEOS, element: <VideosPage /> },
          { path: routerPaths.VIDEO, element: <VideoAnalyticsPage /> },
          { path: routerPaths.PROFILE, element: <ProfilePage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
