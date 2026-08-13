import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`absolute -right-2.5 z-999 min-w-14`;

export const OptionList = tw.ul`flex flex-col gap-2`;

export const Option = tw.button`flex w-full gap-2 hover:cursor-pointer hover:opacity-50 focus-visible:outline focus-visible:outline-secondary-4`;

export const InlineList = tw.ul`flex items-center gap-2`;

export const InlineOption = tw.button<{
  $active?: boolean;
}>`flex items-center gap-1 rounded-md border px-2 py-1 transition-colors hover:cursor-pointer focus-visible:outline focus-visible:outline-secondary-4 ${({
  $active,
}) =>
  $active
    ? 'border-transparent bg-secondary-5 text-base-font'
    : 'border-secondary-1 text-secondary-font hover:text-base-font'} `;
