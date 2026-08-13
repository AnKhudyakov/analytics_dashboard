import tw from 'tailwind-styled-components';

export const BootContent = tw.div<{
  $hidden?: boolean;
}>` ${({ $hidden }) => ($hidden ? 'invisible' : '')} `;
