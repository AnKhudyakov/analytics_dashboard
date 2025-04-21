import { FC, ReactNode } from 'react';
import { TableCell, TableRow } from './ListBody.styles';

interface RowWrapperProps {
  children: ReactNode;
  colSpan: number;
}

export const RowWrapper: FC<RowWrapperProps> = ({ children, colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center">
        {children}
      </TableCell>
    </TableRow>
  );
};
