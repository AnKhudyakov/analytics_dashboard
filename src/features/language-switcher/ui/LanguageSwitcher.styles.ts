import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`absolute -right-2.5 z-999 min-w-14`;

export const OptionList = tw.ul`flex flex-col gap-2`;

export const Option = tw.button`flex w-full gap-2 hover:cursor-pointer hover:opacity-50 focus-visible:outline focus-visible:outline-secondary-4`;
