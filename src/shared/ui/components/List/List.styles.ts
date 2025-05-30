import tw from 'tailwind-styled-components';

export const TableContainer = tw.div`
  h-full bg-secondary rounded-xl overflow-x-auto
  border border-neutral-400 dark:border-secondary-1
`;

interface TableProps {
  $loading?: boolean;
}

export const Table = tw.table<TableProps>`
  w-full border-collapse hidden md:table
  ${({ $loading }) => $loading && `h-full`}
`;

export const TableHead = tw.thead`
  bg-secondary sticky top-0 drop-shadow-lg z-99
`;

export const TableBody = tw.tbody`

`;
