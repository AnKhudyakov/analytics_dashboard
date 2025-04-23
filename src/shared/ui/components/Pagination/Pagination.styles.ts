import tw from 'tailwind-styled-components';

export const PaginationContainer = tw.div`
  flex justify-between items-center w-full p-2 sm:p-4
`;

export const PaginationInfo = tw.div`
  text-xs sm:text-sm
`;

export const PaginationControls = tw.div`
  flex items-center space-x-4
`;

export const RowsPerPageSelect = tw.select`
  text-xs sm:text-sm border rounded-md p-2 border-primary-dark bg-secondary-dark focus:outline-none focus:ring-0 focus:border-secondary-500
`;

export const ArrowButton = tw.button`
  text-base-font p-2 rounded-sm bg-secondary-dark disabled:bg-neutral-700
`;
