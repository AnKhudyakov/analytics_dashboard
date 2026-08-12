import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Container = tw.div`flex min-h-screen w-full flex-col items-center justify-center p-10 text-base-font`;

export const Content = tw.div`glass-panel flex h-full max-h-60 w-full max-w-120 flex-col items-center justify-center gap-6 rounded-2xl p-8 text-center`;

export const HomeLink = tw(Link)`
  accent-surface w-full max-w-92 rounded-lg border border-secondary-1 py-2
  text-center text-white transition-[filter,transform,box-shadow] duration-150
  focus-visible:outline focus-visible:outline-secondary-4
`;
