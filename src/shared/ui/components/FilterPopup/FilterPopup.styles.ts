import tw from 'tailwind-styled-components';

interface WrapperProps {
  rect: DOMRect;
}

export const Wrapper = tw.div<WrapperProps>`
  absolute -left-6 w-full top-18 z-99
`;

export const FilterRow = tw.div`
  flex flex-col gap-2
`;

export const Label = tw.label`
  font-semibold text-base-font
`;

export const Input = tw.input`
  padding: 6px 8px;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Footer = tw.div`
  flex flex-col gap-2
`;
