import tw from 'tailwind-styled-components';

export const PaginationContainer = tw.div`
  flex justify-between items-center w-full p-4
`;

export const PaginationInfo = tw.div`
  text-sm text-gray-700
`;

export const PaginationControls = tw.div`
  flex items-center space-x-4
`;

export const RowsPerPageSelect = tw.select`
  text-sm border rounded-md p-2 border-primary-dark bg-secordary-dark hover:cursor-pointer transition-all
`;

export const ArrowButton = tw.button`
  text-gray-700 p-2 hover:bg-neutral-400 focus:outline-none rounded-sm bg-secordary-dark hover:cursor-pointer transition-all
`;
