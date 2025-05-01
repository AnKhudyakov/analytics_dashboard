import tw from 'tailwind-styled-components';
import { StyledButtonIcon } from '../Button/Button.styles';

export const PaginationContainer = tw.div`
  flex justify-between items-center w-full py-2 sm:p-4
`;

export const PaginationInfo = tw.div`
  text-xs sm:text-sm
`;

export const PaginationControls = tw.div`
  flex items-center space-x-4
`;

export const RowsPerPageSelect = tw.select`
  text-xs sm:text-sm border rounded-md p-1
  border-primary-dark bg-secondary-dark
  focus:outline-none focus:ring-0 focus:border-secondary-1
`;

export const ArrowButton = tw(StyledButtonIcon)`
  text-base-font p-2 rounded-sm bg-secondary-dark disabled:bg-neutral-500 disabled:cursor-auto
`;

export const Label = tw.label`
  text-xs sm:text-sm mr-2
`;
