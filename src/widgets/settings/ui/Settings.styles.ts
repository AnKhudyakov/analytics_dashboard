import tw from 'tailwind-styled-components';

export const Container = tw.div`
  absolute right-4 top-5 md:top-5 md:right-7 w-fit h-fit
  flex gap-4 sm:gap-6 justify-around items-center
  transform transition-transform duration-300 ease-in-out z-999
`;

export const Wrapper = tw.div`
  absolute min-w-14 -right-3 top-6 z-999
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
