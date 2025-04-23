import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const HeaderContent = tw.div`
  flex items-center gap-2
`;

export const HeaderTitle = tw.div`
  hover:cursor-pointer hover:text-secordary-500 transition-colors
  text-right md:text-left max-w-20 sm:max-w-full
`;

interface FilterIconProps {
  hasFilter?: boolean;
}

export const FilterIcon = tw(Icons.filter)<FilterIconProps>`
  hover:text-neutral-500 text-white hover:cursor-pointer transition-colors
  ${({ hasFilter }) => !hasFilter && `text-secordary-500`}
`;
