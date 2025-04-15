import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const HeaderRow = tw.tr`
 even:bg-primary-dark h-[20px]
`;

export const TableHeader = tw.th`
  p-3 text-left font-semibold text-white w-1/5 relative
`;

export const HeaderContent = tw.div`
  flex items-center gap-2
`;

export const HeaderTitle = tw.div`
  hover:cursor-pointer hover:text-secordary-500 transition-all
`;

interface FilterIconProps {
  hasFilter?: boolean;
}

export const FilterIcon = tw(Icons.filter)<FilterIconProps>`
  hover:text-neutral-500 text-white hover:cursor-pointer transition-all
  ${({ hasFilter }) => !hasFilter && `text-secordary-500`}
`;
