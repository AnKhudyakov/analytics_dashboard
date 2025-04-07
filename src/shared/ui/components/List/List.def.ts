import { ColumnChannel } from 'entities/channel/model/types';
import { ColumnVideo } from 'entities/video/model/types';
import { ReactNode } from 'react';

export interface ListProps {
  data: { items: ListItem[]; count: number; ids: string[] };
  empty: ReactNode;
  viewPath: string;
  onSort?: (column: string) => void;
  sortBy?: string | null;
  sortOrder?: 'asc' | 'desc';
}

export interface ListItem {
  title: ColumnChannel | ColumnVideo;
  key: keyof typeof ColumnChannel | keyof typeof ColumnVideo;
  values: (string | number | ReactNode)[];
}
