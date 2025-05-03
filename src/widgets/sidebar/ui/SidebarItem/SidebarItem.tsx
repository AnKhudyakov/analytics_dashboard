import { FC } from 'react';
import { useCollapsedContext } from 'shared/context/CollapsedContext';
import { hoverEffect } from 'shared/ui/effects';
import { SidebarItemProps } from './SidebarItem.def';
import { Item } from './SidebarItem.styles';

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  label,
  to,
}: SidebarItemProps) => {
  const { collapsed } = useCollapsedContext();

  return (
    <Item to={to} className={hoverEffect + (collapsed ? ' p-1.25' : ' p-2')}>
      {icon}
      {collapsed !== true && <span>{label}</span>}
    </Item>
  );
};
