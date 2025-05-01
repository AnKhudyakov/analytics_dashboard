import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Settings } from 'widgets/settings';
import { Sidebar } from 'widgets/sidebar';
import {
  //Header,
  Layout,
  LayoutBody,
  LayoutMain,
  SettingsWrapper,
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
          <SettingsWrapper>
            <Settings />
          </SettingsWrapper>
        </LayoutMain>
      </LayoutBody>
    </Layout>
  );
};
