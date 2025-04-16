import { FC } from 'react';
import { hoverEffect } from 'shared/ui/effects';
import { SidebarItemProps } from './SidebarItem.def';
import { Item } from './SidebarItem.styles';

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  label,
  to,
}: SidebarItemProps) => {
  return (
    <Item to={to} className={hoverEffect}>
      {icon}
      <span>{label}</span>
    </Item>
  );
};
