import tw from 'tailwind-styled-components';

export const Container = tw.div`
  p-10 bg-neutral-800 min-h-screen text-base-font w-full flex flex-col
  justify-center items-center
`;

export const Content = tw.div`
  w-full h-full max-h-60 max-w-120 text-center p-8 bg-secondary rounded-lg
  border border-neutral-400 dark:border-secondary-1
  flex flex-col justify-center items-center gap-6
`;
