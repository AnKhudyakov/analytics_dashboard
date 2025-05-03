import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'widgets/sidebar';
import { Layout, LayoutBody, LayoutMain } from './AppLayout.styles';
import { useCollapsedContext } from 'shared/context/CollapsedContext';

interface AppLayoutProps {}

export const AppLayout: FC<AppLayoutProps> = () => {
  const { collapsed } = useCollapsedContext();
  return (
    <Layout>
      <LayoutBody>
        <LayoutMain className={collapsed?"lg:pl-17":"lg:pl-66"}>
          <Sidebar />
          <Outlet />
        </LayoutMain>
      </LayoutBody>
    </Layout>
  );
};
