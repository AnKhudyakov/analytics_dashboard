import tw from 'tailwind-styled-components';

export const PaginationContainer = tw.div`
  flex justify-between items-center w-full p-2 sm:p-4
`;

export const PaginationInfo = tw.div`
  text-sm
`;

export const PaginationControls = tw.div`
  flex items-center space-x-4
`;

export const RowsPerPageSelect = tw.select`
  text-sm border rounded-md p-2 border-primary-dark bg-secordary-dark focus:outline-none focus:ring-0 focus:border-secordary-500
`;

export const ArrowButton = tw.button`
  text-neutral-400 p-2 focus:outline-none rounded-sm bg-secordary-dark disabled:bg-neutral-700
`;
