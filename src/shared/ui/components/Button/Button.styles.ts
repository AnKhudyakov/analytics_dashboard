import tw from 'tailwind-styled-components';

export const StyledButton = tw.button`
  w-full py-2 bg-secondary-4 max-w-92 sm:max-w-92
  rounded-sm border border-none disabled:bg-neutral-500 disabled:cursor-auto text-white
`;

export const StyledButtonIcon = tw.button`
  text-base-font hover:cursor-pointer
`;
