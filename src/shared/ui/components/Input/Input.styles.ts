import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const StyledInput = tw.input`
  w-full p-2 bg-secordary-dark !text-white
  placeholder-neutral-400 focus:outline-none rounded-sm
  border border-secordary-500
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none
  [type='number']:appearance-textfield
`;

export const Container = tw.div`
  relative w-full max-w-88
`;

export const SearchIcon = tw(Icons.search)`
absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400
`;

export const StyledSearchInput = tw(StyledInput)`
  pl-10
`;

export const ArrowsContainer = tw.div`
  absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1
`;

export const ArrowButton = tw.button`
  text-white text-xs hover:text-primary focus:outline-none
`;

