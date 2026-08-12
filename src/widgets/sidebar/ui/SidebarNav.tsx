import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { routerPaths } from 'shared/constants';
import { Icons } from 'shared/ui/icons';

import { SidebarItem } from './SidebarItem';

interface SidebarNavProps {
  isCollapsed?: boolean;
}

export const SidebarNav: FC<SidebarNavProps> = ({ isCollapsed = false }) => {
  const { t } = useTranslation();

  return (
    <>
      <SidebarItem
        to={routerPaths.CHANNELS}
        icon={<Icons.home aria-hidden />}
        label={t('sidebar.channels')}
        isCollapsed={isCollapsed}
      />
      <SidebarItem
        to={routerPaths.VIDEOS}
        icon={<Icons.videos aria-hidden />}
        label={t('sidebar.videos')}
        isCollapsed={isCollapsed}
      />
    </>
  );
};
