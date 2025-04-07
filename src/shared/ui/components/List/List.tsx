import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { hoverEffect } from 'shared/ui/effects';
import { Icons } from 'shared/ui/icons';
import { ListProps } from './List.def';
import {
  HeaderContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from './List.styles';

export const List: FC<ListProps> = ({
  data,
  empty,
  viewPath,
  onSort,
  sortBy,
  sortOrder,
}) => {
  const navigate = useNavigate();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {data.items.map((col, index) => (
              <TableHeader
                key={col.title}
                className={index === 0 ? 'w-1/4' : 'w-1/5'}
                onClick={() => onSort?.(col.key)}
              >
                <HeaderContent>
                  {col.title}
                  {sortBy === col.key && (
                    <>
                      {sortOrder === 'asc' ? (
                        <Icons.sortASC width={20} height={20} />
                      ) : (
                        <Icons.sortDESC width={20} height={20} />
                      )}
                    </>
                  )}
                </HeaderContent>
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.count ? (
            Array.from({ length: data.count }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={hoverEffect}
                onClick={() => navigate(`${viewPath}/${data.ids[rowIndex]}`)}
              >
                {data.items.map((col, index) => (
                  <TableCell key={`${col.title}-${rowIndex}`}>
                    {col.values[rowIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center">
              <TableCell colSpan={data.items.length} className="text-center">
                {empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
