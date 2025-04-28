import { TagCloud } from 'react-tagcloud';
import tw from 'tailwind-styled-components';

export const StyledTagCloud = tw(TagCloud)`
  flex flex-wrap gap-2 justify-center
`;

export const colors = [
  'text-blue-500',
  'text-red-400',
  'text-green-600',
  'text-purple-500',
  'text-pink-400',
  'text-yellow-500',
  'text-indigo-500',
  'text-teal-400',
];

export const TagItem = tw.span`
m-2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-80
`
