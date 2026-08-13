import tw from 'tailwind-styled-components';

export const List = tw.div`relative flex w-full flex-col`;

export const Indicator = tw.span`pointer-events-none absolute inset-x-0 top-0 rounded-sm bg-secondary-5 transition-transform duration-300 ease-out motion-reduce:transition-none`;
