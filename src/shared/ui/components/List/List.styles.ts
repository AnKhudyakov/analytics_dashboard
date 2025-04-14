import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const TableContainer = tw.div`
  bg-secordary-dark rounded-xl shadow-md overflow-x-auto border border-secordary-500 h-full
`;

interface TableProps {
  $loading?: boolean;
}

export const Table = tw.table<TableProps>`
  w-full border-collapse
  ${({ $loading }) => $loading && `h-full`}
`;

export const TableHead = tw.thead`
  bg-secordary-dark sticky top-0 drop-shadow-lg z-99
`;

export const TableRow = tw.tr`
 even:bg-primary-dark h-[20px]
`;

export const TableHeader = tw.th`
  p-3 text-left font-semibold text-white w-1/5 relative
`;

export const HeaderContent = tw.div`
  flex items-center gap-2
`;

export const HeaderTitle = tw.div`
  hover:cursor-pointer hover:text-secordary-500 transition-all
`;

interface FilterIconProps {
  hasFilter?: boolean;
}

export const FilterIcon = tw(Icons.filter)<FilterIconProps>`
  hover:text-neutral-500 text-white hover:cursor-pointer transition-all
  ${({ hasFilter }) => !hasFilter && `text-secordary-500`}
`;

export const TableBody = tw.tbody`

`;

export const TableCell = tw.td`
  p-3 text-neutral-400 align-middle text-start
`;
