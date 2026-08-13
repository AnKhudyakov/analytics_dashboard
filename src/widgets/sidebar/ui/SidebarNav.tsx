import { type ParseKeys } from 'i18next';
import { type FC, type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { routerPaths } from 'shared/constants';
import { Icons } from 'shared/ui/icons';

import { SidebarItem } from './SidebarItem';
import { Indicator, List } from './SidebarNav.styles';

interface SidebarNavProps {
  isCollapsed?: boolean;
}

interface NavEntry {
  to: string;
  icon: ReactNode;
  labelKey: ParseKeys;
}

const ENTRIES = [
  {
    to: routerPaths.OVERVIEW,
    icon: <Icons.home aria-hidden />,
    labelKey: 'sidebar.overview',
  },
  {
    to: routerPaths.COMPARE,
    icon: <Icons.compare aria-hidden />,
    labelKey: 'sidebar.compare',
  },
  {
    to: routerPaths.CHANNELS,
    icon: <Icons.list aria-hidden />,
    labelKey: 'sidebar.channels',
  },
  {
    to: routerPaths.VIDEOS,
    icon: <Icons.videos aria-hidden />,
    labelKey: 'sidebar.videos',
  },
  {
    to: routerPaths.PROFILE,
    icon: <Icons.user aria-hidden />,
    labelKey: 'sidebar.profile',
  },
] as const satisfies readonly NavEntry[];

export const SidebarNav: FC<SidebarNavProps> = ({ isCollapsed = false }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const activeIndex = useMemo(
    () => ENTRIES.findIndex((entry) => pathname.startsWith(entry.to)),
    [pathname]
  );

  return (
    <List>
      {activeIndex >= 0 && (
        <Indicator
          aria-hidden
          style={{
            height: `${100 / ENTRIES.length}%`,
            transform: `translateY(${activeIndex * 100}%)`,
          }}
        />
      )}
      {ENTRIES.map(({ to, icon, labelKey }) => (
        <SidebarItem
          key={to}
          to={to}
          icon={icon}
          label={t(labelKey)}
          isCollapsed={isCollapsed}
        />
      ))}
    </List>
  );
};
