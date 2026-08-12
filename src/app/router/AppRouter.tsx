import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Loader } from 'shared/ui/Loader';

import { router } from './routes';

export const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);
