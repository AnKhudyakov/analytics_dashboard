import tw from 'tailwind-styled-components';

export const TAG_COLORS = [
  'text-chart-2',
  'text-chart-1',
  'text-chart-3',
  'text-chart-4',
  'text-chart-5',
  'text-secondary-2',
  'text-secondary-3',
] as const;

export const TagList = tw.ul`flex flex-wrap items-center justify-center gap-2 p-2 sm:gap-3`;

export const TagItem = tw.li`cursor-pointer text-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:opacity-80`;
