import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  bg-neutral-800 h-screen w-full flex justify-center items-center
`;

export const Container = tw.div`
bg-neutral-800 h-screen text-base-font w-full sm:max-w-7xl
  flex flex-col sm:flex-row justify-center items-center
`;

export const WrapperForm = tw.div`
  h-full w-full sm:min-w-90 sm:max-w-140 sm:relative
  border-t sm:border-l sm:border-r border-secondary
  shadow-msidebar sm:shadow-sidebar
  p-3 py-6 md:p-6 lg:p-10
  flex flex-col items-center justify-start sm:justify-center gap-1 overflow-auto
`;

export const SettingsWrapper = tw.div`
   absolute top-4 right-3 md:right-6 lg:right-10 w-22
`;
