import { Button } from 'shared/ui/components/Button';
import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const StyledInput = tw.input`
  w-full p-2 bg-secondary-dark !text-base-font
  placeholder-secondary-font focus:outline-none focus:border-secondary-4 rounded-sm
  border border-secondary-1
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none
  [type='number']:appearance-textfield
`;

export const Container = tw.div`
  relative w-full sm:max-w-100 !text-base-font
`;

export const SearchIcon = tw(Icons.search)`
absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-font
`;

export const StyledSearchInput = tw(StyledInput)`
  pl-10
`;

export const ArrowsContainer = tw.div`
  absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1
`;

export const ArrowButton = tw.button`
  text-base-font text-xs hover:text-primary focus:outline-none
`;

export const EndButtonIcon = tw(Button)`
absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-font
`;
