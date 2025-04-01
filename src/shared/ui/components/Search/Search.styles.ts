import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const Input = tw.input`
  w-full p-2 pl-10 bg-secordary-dark text-white placeholder-neutral-400 focus:outline-none rounded-sm border border-secordary-500
`;

export const Container = tw.div`
  relative w-full
`;

export const SearchIcon = tw(Icons.search)`
absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400
`;
