import tw from 'tailwind-styled-components';

export const TAG_COLORS = [
  'text-blue-500',
  'text-red-400',
  'text-green-600',
  'text-purple-500',
  'text-pink-400',
  'text-yellow-500',
  'text-indigo-500',
  'text-teal-400',
] as const;

export const TagList = tw.ul`flex flex-wrap items-center justify-center gap-2 p-2 sm:gap-3`;

export const TagItem = tw.li`cursor-pointer text-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-80`;
