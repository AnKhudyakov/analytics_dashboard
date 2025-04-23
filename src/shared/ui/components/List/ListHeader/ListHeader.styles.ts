import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const HeaderRow = tw.tr`
 even:bg-primary-dark h-[20px]
`;

export const TableHeader = tw.th`
  p-3 text-left font-semibold text-base-font w-1/5 relative
`;

export const HeaderContent = tw.div`
  flex items-center gap-2
`;

export const HeaderTitle = tw.div`
  hover:cursor-pointer hover:text-secondary-500 transition-colors
`;

interface FilterIconProps {
  hasFilter?: boolean;
}

export const FilterIcon = tw(Icons.filter)<FilterIconProps>`
  hover:text-neutral-500 text-base-font hover:cursor-pointer transition-colors
  ${({ hasFilter }) => !hasFilter && `text-secondary-500`}
`;
