import tw from 'tailwind-styled-components';

export const Frame = tw.div<{
  $size?: 'sm' | 'md';
}>`w-full min-w-0 ${({ $size }) => ($size === 'sm' ? 'h-40 sm:h-44' : 'h-56 sm:h-64 lg:h-72')} `;
