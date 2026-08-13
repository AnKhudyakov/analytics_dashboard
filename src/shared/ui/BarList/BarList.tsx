import { type FC, type ReactNode } from 'react';

import { Bar, Item, Label, List, Row, Track, Value } from './BarList.styles';

export interface BarListItem {
  key: string;
  label: string;
  value: number;
  formattedValue: string;
  color?: string;
  icon?: ReactNode;
}

export interface BarListProps {
  items: readonly BarListItem[];
  caption: string;
}

export const BarList: FC<BarListProps> = ({ items, caption }) => {
  const max = Math.max(...items.map((item) => item.value), 0);

  return (
    <List aria-label={caption}>
      {items.map((item) => (
        <Item key={item.key}>
          <Row>
            <Label>
              {item.icon}
              <span className="truncate">{item.label}</span>
            </Label>
            <Value>{item.formattedValue}</Value>
          </Row>
          <Track>
            <Bar
              style={{
                width: `${max ? (item.value / max) * 100 : 0}%`,
                backgroundColor: item.color,
              }}
            />
          </Track>
        </Item>
      ))}
    </List>
  );
};
