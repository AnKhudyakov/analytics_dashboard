import tw from 'tailwind-styled-components';

export const Item = tw.a`
  flex items-center gap-3 px-4 py-2 rounded-sm text-neutral-400 hover:cursor-pointer max-w-66
  ${(p) => (p.$active ? 'bg-secordary-dark text-white' : '')}
`;
