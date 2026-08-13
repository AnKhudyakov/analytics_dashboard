import tw from 'tailwind-styled-components';

import { Icons } from 'shared/ui/icons';

export const Field = tw.div`flex w-full flex-col gap-1`;

export const Label = tw.label`text-xs font-semibold text-secondary-font`;

export const StyledInput = tw.input`glass-field w-full rounded-md border border-secondary-1 p-2 focus:border-secondary-4 focus:outline-none aria-invalid:border-danger [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;

export const Container = tw.div`relative w-full !text-base-font`;

export const SearchIcon = tw(Icons.search)`
  absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 transform
  text-secondary-font
`;

export const StyledSearchInput = tw(StyledInput)`glass-field-ghost pl-10`;

export const EndIconSlot = tw.div`absolute top-1/2 right-3 z-10 h-5 w-5 -translate-y-1/2 transform text-secondary-font`;

export const ErrorText = tw.p`min-h-4 text-xs leading-4 text-danger`;
