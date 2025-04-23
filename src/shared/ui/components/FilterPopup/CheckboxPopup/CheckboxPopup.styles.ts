import tw from 'tailwind-styled-components';

interface WrapperProps {
  rect: DOMRect;
}

export const Container = tw.div<WrapperProps>`
  w-full h-full flex flex-col gap-4 p-2
`;

export const FilterRow = tw.div`
  flex flex-col gap-2
`;

export const Label = tw.label`
  font-semibold text-base-font flex items-start gap-2 hover:cursor-pointer w-fit
`;

export const Footer = tw.div`
  flex flex-col gap-2
`;
