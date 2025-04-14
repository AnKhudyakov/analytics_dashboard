import { ReactNode } from 'react';
import { Filter } from 'shared/api/types';

export interface ListItemProps {
  items: ListItem[];
  path: string;
  rowIndex: number;
}

export interface ListItem {
  title: string;
  key: string;
  filterType?: Filter['filterType'];
  values: (string | number | ReactNode)[];
}
