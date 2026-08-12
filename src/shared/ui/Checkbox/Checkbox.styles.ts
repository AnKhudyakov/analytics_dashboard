import tw from 'tailwind-styled-components';

export const HiddenCheckbox = tw.input`sr-only`;

export const CheckboxWrapper = tw.label`inline-flex cursor-pointer items-center gap-2 select-none focus-within:outline focus-within:outline-secondary-4`;

export const CheckboxIcon = tw.span`flex h-5 w-5 items-center justify-center`;
