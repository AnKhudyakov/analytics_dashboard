import tw from 'tailwind-styled-components';

export const StyledButton = tw.button<{
  $fullWidth?: boolean;
}>`accent-surface w-full cursor-pointer rounded-lg border border-secondary-1 py-2 text-white transition-[filter,transform,box-shadow] duration-150 disabled:cursor-auto disabled:border-transparent disabled:bg-neutral-500 disabled:text-secondary-font ${({ $fullWidth }) => ($fullWidth ? '' : 'max-w-92')} `;

export const StyledButtonIcon = tw.button`text-base-font transition-colors duration-200 hover:cursor-pointer hover:text-secondary-4`;
