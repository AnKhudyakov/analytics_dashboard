import tw from 'tailwind-styled-components';

export const Container = tw.div`flex min-w-0 items-center gap-3`;

export const Avatar = tw.div`relative h-10 w-10 shrink-0 overflow-hidden rounded-full`;

export const Name = tw.p`line-clamp-2 min-w-0 font-semibold break-words text-secondary-font`;
