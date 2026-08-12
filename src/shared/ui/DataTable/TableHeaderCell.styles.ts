import tw from 'tailwind-styled-components';

import { Icons } from 'shared/ui/icons';

export const HeaderContent = tw.div`flex items-center gap-2`;

export const SortButton = tw.button`flex max-w-20 items-center gap-2 text-right transition-colors hover:cursor-pointer hover:text-secondary-1 focus-visible:outline focus-visible:outline-secondary-4 sm:max-w-full md:text-left`;

export const FilterIcon = tw(Icons.filter)<{ $active?: boolean }>`
  text-base-font transition-colors hover:cursor-pointer hover:opacity-80
  ${({ $active }) => ($active ? '' : 'opacity-20')}
`;
