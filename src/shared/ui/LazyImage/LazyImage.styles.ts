import tw from 'tailwind-styled-components';

export const Frame = tw.div`relative h-full w-full overflow-hidden`;

export const Image = tw.img<{
  $loaded?: boolean;
}>`absolute inset-0 h-full w-full rounded-[inherit] object-cover transition-opacity duration-700 ease-in-out ${({ $loaded }) => ($loaded ? 'opacity-100' : 'opacity-0')} `;
