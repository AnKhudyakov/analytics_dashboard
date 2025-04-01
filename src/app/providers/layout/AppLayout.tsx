import { Outlet } from 'react-router-dom';

import { FC } from 'react';
import { Sidebar } from 'widgets/sidebar';
import {
  //Header,
  Layout,
  LayoutBody,
  LayoutHeader,
  LayoutMain,
} from './AppLayout.styles';

interface IProps {}

export const AppLayout: FC<IProps> = () => {
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
