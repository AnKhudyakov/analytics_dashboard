import tw from 'tailwind-styled-components';

export const TableContainer = tw.div`h-full overflow-x-auto rounded-xl border border-neutral-400 bg-secondary dark:border-secondary-1`;

export const Table = tw.table<{
  $stretch?: boolean;
}>`hidden w-full border-collapse md:table ${({ $stretch }) => ($stretch ? 'h-full' : '')} `;

export const TableHead = tw.thead`sticky top-0 z-99 bg-secondary drop-shadow-lg`;

export const HeaderRow = tw.tr`h-[20px]`;

export const HeaderCell = tw.th<{
  $first?: boolean;
}>`relative p-3 text-left font-semibold text-base-font ${({ $first }) => ($first ? 'w-1/4' : 'w-1/5')} `;

export const BodyRow = tw.tr`max-h-10 even:bg-primary`;

export const BodyCell = tw.td<{
  $first?: boolean;
}>`max-h-10 p-3 text-start align-middle text-secondary-font ${({ $first }) => ($first ? '' : 'pl-11')} `;

export const RowLink = tw.a`block focus-visible:outline focus-visible:outline-secondary-4`;

export const StatusCell = tw.td`p-3 text-center align-middle text-secondary-font`;
