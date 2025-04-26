import { NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Item = tw(NavLink)`
  flex items-center gap-3 px-4 py-2 rounded-sm text-secondary-font hover:cursor-pointer
  [&.active]:bg-secondary-dark [&.active]:text-base-font 
`;
