import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from 'widgets/sidebar';
import {
  //Header,
  Layout,
  LayoutBody,
  LayoutMain,
} from './AppLayout.styles';

interface AppLayoutProps {}

export const AppLayout: FC<AppLayoutProps> = () => {
  return (
    <Layout>
      {/* <Header>
        <LayoutHeader></LayoutHeader>
      </Header> */}
      <LayoutBody>
        <LayoutMain>
          <Sidebar />
          <Outlet />
        </LayoutMain>
      </LayoutBody>
    </Layout>
  );
};
