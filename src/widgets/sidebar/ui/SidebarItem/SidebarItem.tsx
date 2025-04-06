import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarItemProps } from './SidebarItem.def';
import { Item } from './SidebarItem.styles';
import { hoverEffect } from 'shared/ui/effects';

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  label,
  to,
}: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Item to={to} className={hoverEffect}>
      {icon}
      <span>{label}</span>
    </Item>
  );
};
