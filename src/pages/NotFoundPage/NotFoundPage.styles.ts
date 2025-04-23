import tw from 'tailwind-styled-components';

export const Container = tw.div`
  p-10 bg-neutral-800 min-h-screen text-base-font w-full flex flex-col justify-center items-center
`;

export const Content = tw.div`
w-full h-full max-h-60 max-w-100 text-center p-8 bg-secondary-dark rounded-lg border border-secondary-500 flex flex-col justify-center items-center gap-6
`;
