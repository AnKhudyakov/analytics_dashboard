import tw from 'tailwind-styled-components';

import { Icons } from 'shared/ui/icons';

export const Field = tw.div`flex w-full flex-col gap-1 sm:max-w-100`;

export const Label = tw.label`text-xs font-semibold text-secondary-font`;

export const StyledInput = tw.input`w-full rounded-sm border border-secondary-1 bg-secondary p-2 !text-base-font placeholder-secondary-font focus:border-secondary-4 focus:outline-none aria-invalid:border-red-400 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;

export const Container = tw.div`relative w-full !text-base-font`;

export const SearchIcon = tw(Icons.search)`
  absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-secondary-font
`;

export const StyledSearchInput = tw(StyledInput)`
  pl-10
`;

export const EndIconSlot = tw.div`absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 transform text-secondary-font`;

export const ErrorText = tw.p`min-h-4 text-xs text-red-400`;
