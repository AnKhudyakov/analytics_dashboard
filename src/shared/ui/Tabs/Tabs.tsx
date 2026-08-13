import { type ReactNode } from 'react';

import { Indicator, Tab, TabLabel, TabList } from './Tabs.styles';

export interface TabItem<T extends string> {
  id: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps<T extends string> {
  tabs: readonly TabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  label: string;
  className?: string;
}

export const Tabs = <T extends string>({
  tabs,
  active,
  onChange,
  label,
  className,
}: TabsProps<T>) => {
  const activeIndex = tabs.findIndex((tab) => tab.id === active);

  return (
    <TabList role="group" aria-label={label} className={className}>
      {activeIndex >= 0 && (
        <Indicator
          aria-hidden
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      )}
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          type="button"
          $active={tab.id === active}
          aria-pressed={tab.id === active}
          disabled={tab.disabled}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <TabLabel>{tab.label}</TabLabel>
        </Tab>
      ))}
    </TabList>
  );
};
