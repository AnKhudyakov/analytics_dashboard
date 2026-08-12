import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Container = tw.div`flex min-h-screen w-full flex-col items-center justify-center bg-neutral-800 p-10 text-base-font`;

export const Content = tw.div`flex h-full max-h-60 w-full max-w-120 flex-col items-center justify-center gap-6 rounded-lg border border-neutral-400 bg-secondary p-8 text-center dark:border-secondary-1`;

export const HomeLink = tw(Link)`
  w-full max-w-92 rounded-sm bg-secondary-4 py-2 text-center text-white
  transition-all duration-500 hover:bg-neutral-700
  focus-visible:outline focus-visible:outline-secondary-4
`;
