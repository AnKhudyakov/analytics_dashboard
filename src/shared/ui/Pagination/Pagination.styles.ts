import tw from 'tailwind-styled-components';

import { StyledButtonIcon } from '../Button/Button.styles';

export const PaginationContainer = tw.div`flex w-full items-center justify-between py-2 sm:p-4`;

export const PaginationInfo = tw.div`text-xs sm:text-sm`;

export const PaginationControls = tw.div`flex items-center space-x-4`;

export const RowsPerPageSelect = tw.select`rounded-md border border-primary bg-secondary p-1 text-xs focus:border-secondary-1 focus:ring-0 focus:outline-none sm:text-sm`;

export const ArrowButton = tw(StyledButtonIcon)`
  text-base-font p-2 rounded-sm bg-secondary disabled:bg-neutral-500 disabled:cursor-auto
`;

export const Label = tw.label`mr-2 text-xs sm:text-sm`;
