import tw from 'tailwind-styled-components';

export const Container = tw.div`
  w-full sm:h-full flex flex-col justify-center gap-1 sm:gap-4
  p-3 py-4 sm:p-6 md:p-10 shadow-msidebar sm:shadow-none z-99
`;


export const FlexContainer = tw.div`
  w-full flex justify-between gap-1 sm:gap-4
`;
