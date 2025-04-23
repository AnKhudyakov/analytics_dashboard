import tw from 'tailwind-styled-components';

export const TableContainer = tw.div`
bg-secordary-dark rounded-xl shadow-md overflow-x-auto
  border border-secordary-500 h-full
`;

interface TableProps {
  $loading?: boolean;
}

export const Table = tw.table<TableProps>`
  w-full border-collapse hidden md:table
  ${({ $loading }) => $loading && `h-full`}
`;

export const TableHead = tw.thead`
  bg-secordary-dark sticky top-0 drop-shadow-lg z-99
`;

export const TableBody = tw.tbody`

`;
