import { NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Item = tw(NavLink)`
  flex items-center gap-3 rounded-sm text-secondary-font hover:cursor-pointer
  [&.active]:bg-secondary-5 [&.active]:text-white
`;
