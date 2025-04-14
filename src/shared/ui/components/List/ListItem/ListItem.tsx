import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { hoverEffect } from 'shared/ui/effects';
import { ListItemProps } from './ListItem.def';
import { TableCell, TableRow } from './ListItem.styles';

export const ListItem: FC<ListItemProps> = ({
  items,
  path,
  rowIndex
}) => {
  const navigate = useNavigate();

  return (
    <TableRow
      className={hoverEffect}
      onClick={() => navigate(path)}
    >
      {items.map((col) => (
        <TableCell key={`${col.title}-${rowIndex}`}>
          {col.values[rowIndex]}
        </TableCell>
      ))}
    </TableRow>
  );
};
