import tw from 'tailwind-styled-components';

export const Header = tw.div`
  h-18.5 !text-sm flex justify-between items-center px-4 py-2
text-base-font font-semibold bg-secondary sticky top-0 z-99 gap-2
`;

export const SwipeControls = tw.div`
  flex p-2 gap-2 items-center justify-between bg-primary
  sticky top-18.5 z-90 shadow-xl
`;

export const ArrowButton = tw.button`
text-base-font p-2 rounded-sm disabled:bg-neutral-500 disabled:cursor-auto
hover:text-neutral-500 hover:cursor-pointer
`;

export const Swiper = tw.div`
  w-1/2 flex items-center justify-end gap-2 relative
`;
