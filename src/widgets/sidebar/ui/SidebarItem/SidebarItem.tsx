import { type FC, type ReactNode } from 'react';

import { hoverEffect } from 'shared/ui/effects';

import { Item } from './SidebarItem.styles';

export interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  to: string;
  isCollapsed?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  label,
  to,
  isCollapsed = false,
}) => (
  <Item
    to={to}
    title={isCollapsed ? label : undefined}
    className={`${hoverEffect} ${isCollapsed ? 'p-1.25' : 'p-2'}`}
  >
    {icon}
    {isCollapsed ? (
      <span className="sr-only">{label}</span>
    ) : (
      <span>{label}</span>
    )}
  </Item>
);
