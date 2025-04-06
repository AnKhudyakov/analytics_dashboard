import { Icons } from 'shared/ui/icons';
import tw from 'tailwind-styled-components';

export const SidebarContainer = tw.aside`
  w-88 h-screen bg-neutral-800 flex flex-col p-6 border-r border-secordary-dark
  text-neutral-100 drop-shadow-3 gap-4
`;

export const Nav = tw.nav`
  flex-1 mt-4
`;

export const FlexContainer = tw.div`
  flex gap-1 justify-between
`;

export const ExitIcon = tw(Icons.exitIcon)`
  fill-secordary-dark hover:fill-neutral-700 overflow-hidden rounded-3
  transition-colors
`;
