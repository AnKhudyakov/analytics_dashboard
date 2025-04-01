import { FC } from 'react';
import { hoverEffect } from 'shared/ui/effects';
import { ListProps } from './List.def';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from './List.styles';

export const List: FC<ListProps> = ({ data, empty }) => {
  if (!data.count) return empty;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {data.items.map((col) => (
              <TableHeader key={col.title}>{col.title}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: data.count }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className={hoverEffect}>
              {data.items.map((col) => (
                <TableCell key={`${col.title}-${rowIndex}`}>
                  {col.values[rowIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
