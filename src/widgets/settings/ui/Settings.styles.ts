import tw from 'tailwind-styled-components';

export const Container = tw.div`
  w-full flex gap-2 justify-around items-center relative
`;

export const Wrapper = tw.div`
  absolute min-w-18 -left-2 bottom-7 z-99
`;

export const Option = tw.div`
  flex gap-2 hover:cursor-pointer hover:opacity-50
`;
