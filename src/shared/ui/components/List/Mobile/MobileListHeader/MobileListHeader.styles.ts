import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const Header = tw.div`
  h-18.5 !text-sm flex justify-between items-center px-4 py-2
text-base-font font-semibold bg-secondary-dark sticky top-0 z-99 gap-2
`;

export const SwipeControls = tw.div`
  flex p-2 gap-2 items-center justify-between bg-primary-dark
  sticky top-18.5 z-90 shadow-xl
`;

export const ArrowButton = tw.button`
text-base-font p-2 rounded-sm disabled:bg-neutral-700
hover:text-neutral-500 hover:cursor-pointer
`;

export const Swiper = tw.div`
  w-1/2 flex items-center justify-end gap-2 relative
`;

interface FilterIconProps {
  hasFilter?: boolean;
}

export const FilterIcon = tw(Icons.filter)<FilterIconProps>`
  hover:text-neutral-500 text-base-font hover:cursor-pointer transition-colors
  ${({ hasFilter }) => !hasFilter && `text-secondary-500`}
`;
