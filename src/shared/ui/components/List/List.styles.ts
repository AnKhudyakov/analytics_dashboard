import tw from 'tailwind-styled-components';

export const TableContainer = tw.div`
  bg-secordary-dark rounded-xl shadow-md overflow-x-auto border border-secordary-500 h-full
`;

export const Table = tw.table`
  w-full border-collapse
`;

export const TableHead = tw.thead`
  bg-secordary-dark sticky top-0
`;

export const TableRow = tw.tr`
 even:bg-primary-dark
`;

export const TableHeader = tw.th`
  p-3 text-left font-semibold text-gray-700 uppercase
`;

export const TableBody = tw.tbody`

`;

export const TableCell = tw.td`
  p-3 text-gray-700
`;
