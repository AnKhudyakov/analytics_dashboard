import tw from 'tailwind-styled-components';

export const Container = tw.div`
   md:hidden h-full flex flex-col
`;

export const Header = tw.div`
    h-18.5 !text-sm flex justify-between items-center px-4 py-2 border-b
  border-secondary-dark text-base-font font-semibold
  bg-secondary-dark sticky top-0
    drop-shadow-lg z-99 gap-2
`;

export const Row = tw.div`
    flex px-4 py-3 border-b border-neutral-700
  text-base-font text-sm gap-2
`;

export const Cell = tw.div`
    w-1/2 truncate
`;

export const SwipeControls = tw.div`
    flex gap-2 items-center
`;

export const ArrowButton = tw.button`
  text-base-font p-2 rounded-sm disabled:bg-neutral-700
  hover:text-neutral-500 hover:cursor-pointer
`;

export const Swipeable = tw.div`
  flex-1 overflow-auto
`;
