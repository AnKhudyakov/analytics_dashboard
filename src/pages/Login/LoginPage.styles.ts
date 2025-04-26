import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  bg-neutral-800 h-screen w-full flex justify-center items-center
`;

export const Container = tw.div`
bg-neutral-800 h-screen text-base-font w-full sm:max-w-7xl
  flex flex-col sm:flex-row justify-center items-center
`;

export const WrapperForm = tw.div`
  h-full w-full sm:min-w-90 sm:max-w-120
  border-t sm:border-l sm:border-r border-secondary-dark
  shadow-msidebar sm:shadow-sidebar
  px-4 lg:p-6
  flex flex-col items-center justify-start sm:justify-between gap-1
`;
