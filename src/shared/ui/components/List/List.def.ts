import { ReactNode } from 'react';

export interface ListProps {
  data: { items: ListItem[]; count: number };
  empty: ReactNode;
}

export interface ListItem {
  title: string;
  values: (string | number | ReactNode)[];
}
