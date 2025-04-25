import tw from 'tailwind-styled-components';

interface WrapperProps {
  rect: DOMRect;
}

export const Container = tw.div<WrapperProps>`
  w-full h-full flex flex-col gap-4 p-2
`;
