import tw from 'tailwind-styled-components';

export const TableContainer = tw.div`glass-panel h-full overflow-hidden rounded-panel`;

export const Table = tw.table`hidden h-full w-full flex-col md:flex`;

export const TableHead = tw.thead`glass-strong z-10 table w-full shrink-0 table-fixed drop-shadow-lg`;

export const TableBody = tw.tbody`scroll-area block min-h-0 flex-1`;

export const HeaderRow = tw.tr`h-[20px]`;

export const HeaderCell = tw.th<{
  $first?: boolean;
}>`relative p-3 text-left font-semibold text-base-font ${({ $first }) =>
  $first ? 'w-[28%]' : 'w-[18%]'} `;

export const BodyRow = tw.tr`table max-h-10 w-full table-fixed even:bg-row-alt`;

export const BodyCell = tw.td<{
  $first?: boolean;
}>`max-h-10 p-3 text-start align-middle text-secondary-font ${({ $first }) =>
  $first ? 'w-[28%]' : 'w-[18%] pl-8'} `;

export const StatusRow = tw.tr`table h-full w-full`;

export const StatusCell = tw.td`h-full p-3 text-center align-middle text-secondary-font`;
