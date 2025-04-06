import { ReactNode } from 'react';

export interface ListProps {
  data: { items: ListItem[]; count: number, ids: string[] };
  empty: ReactNode;
  viewPath: string;
}

export interface ListItem {
  title: string;
  values: (string | number | ReactNode)[];
}
