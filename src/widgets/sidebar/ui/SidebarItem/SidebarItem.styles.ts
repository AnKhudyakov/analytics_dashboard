import { NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Item = tw(NavLink)<{ $collapsed?: boolean }>`
  relative flex min-h-9 items-center gap-3 rounded-sm whitespace-nowrap
  text-secondary-font hover:cursor-pointer
  [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0
  [&.active]:text-base-font
  ${({ $collapsed }) => ($collapsed ? 'justify-center' : 'px-2')}
`;
