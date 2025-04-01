import { AppLayout } from 'app/providers/layout';
import { ChannelsPage } from 'pages/Channels';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { routerPaths } from 'shared/constants';

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path={routerPaths.MAIN_PATH} element={<AppLayout />}>
      <Route index element={<ChannelsPage></ChannelsPage>} />
    </Route>
  );

  const router = createHashRouter(routes, {});

  return <RouterProvider router={router} />;
};
