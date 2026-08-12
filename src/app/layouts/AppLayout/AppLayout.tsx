import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useSessionExpiry } from 'features/auth';
import { Loader } from 'shared/ui/Loader';
import { Sidebar, useSidebar } from 'widgets/sidebar';

import { Layout, LayoutMain } from './AppLayout.styles';

export const AppLayout = () => {
  const { isCollapsed } = useSidebar();
  useSessionExpiry();

  return (
    <Layout>
      <LayoutMain className={isCollapsed ? 'lg:pl-17' : 'lg:pl-66'}>
        <Sidebar />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </LayoutMain>
    </Layout>
  );
};
