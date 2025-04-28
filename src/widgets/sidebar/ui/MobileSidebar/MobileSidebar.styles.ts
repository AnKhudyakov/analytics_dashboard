import tw from 'tailwind-styled-components';

export const Container = tw.aside`
  fixed top-0 left-0 z-999 w-64 h-full bg-neutral-800 p-4 border-r border-secondary-dark flex flex-col gap-6
  transform transition-transform duration-300 ease-in-out lg:hidden
`;

export const MobileHeader = tw.div`
  fixed top-0 left-0 z-999 w-full bg-neutral-800 flex lg:hidden p-4 sm:p-6 gap-6 justify-between border-b border-secondary-dark
  text-base-font shadow-msidebar
`;

export const HeaderLeft = tw.div`
  flex gap-6 drop-shadow-none
`;

export const Overlay = tw.div`
  fixed inset-0 bg-black/40 z-999 lg:hidden
`;

export const HeaderMenu = tw.div`
  flex justify-between items-center
`;
