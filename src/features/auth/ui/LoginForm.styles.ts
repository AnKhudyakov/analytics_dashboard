import { NavLink } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Form = tw.form`
  flex flex-col gap-1 items-center
  max-w-sm mx-auto p-2 py-10 rounded
`;

export const ErrorText = tw.p`
  text-red-500
  text-sm w-full
`;

export const Empty = tw.div`
 h-4.5
`;

export const Link = tw(NavLink)`
 font-bold text-xs hover:text-neutral-500
`;
