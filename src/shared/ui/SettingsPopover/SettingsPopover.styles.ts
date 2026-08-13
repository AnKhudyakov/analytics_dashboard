import tw from 'tailwind-styled-components';

export const Anchor = tw.div`relative flex items-center`;

export const Wrapper = tw.div<{
  $placement?: 'up' | 'down';
}>`absolute z-999 w-56 ${({ $placement }) =>
  $placement === 'down' ? 'top-10 right-0' : 'bottom-10 left-0'} `;

export const SettingsRow = tw.div`flex items-center justify-between gap-3`;

export const SettingsField = tw.div`flex flex-col gap-2`;

export const SettingsLabel = tw.span`text-xs font-semibold text-secondary-font`;
