import tw from 'tailwind-styled-components';

export const Container = tw.div`
  w-full h-fit relative
  flex gap-4 sm:gap-6 justify-between items-center
  transform transition-transform duration-300 ease-in-out z-999
`;

export const Wrapper = tw.div`
  absolute min-w-14 -right-2.5 z-999
`;

export const Option = tw.div`
  flex gap-2 hover:cursor-pointer hover:opacity-50
`;

export const Overlay = tw.div`
  fixed top-0 bottom-0 inset-0 z-99
`;

export const ButtonWrapper = tw.div`
  absolute right-0 top-0 z-99 p-3 sm:py-3 text-right
`;
