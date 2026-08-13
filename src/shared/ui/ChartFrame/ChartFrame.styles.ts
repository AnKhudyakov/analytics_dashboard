import tw from 'tailwind-styled-components';

export const Frame = tw.div<{
  $size?: 'sm' | 'md' | 'fill';
}>`w-full min-w-0 ${({ $size }) => {
  if ($size === 'sm') return 'h-40 sm:h-44';
  if ($size === 'fill') return 'h-40 flex-1 sm:h-44';
  return 'h-56 sm:h-64 lg:h-72';
}} `;
